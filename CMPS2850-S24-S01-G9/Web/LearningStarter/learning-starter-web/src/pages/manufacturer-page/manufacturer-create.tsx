import { FormErrors, useForm } from "@mantine/form";
import {
  ApiResponse,
  ManufacturerCreateUpdateDto,
  ManufacturerGetDto,
} from "../../constants/types";
import { Button, Container, Flex, Space, TextInput } from "@mantine/core";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";

export const ManufacturerCreate = () => {
  const navigate = useNavigate();
  const mantineForm = useForm<ManufacturerCreateUpdateDto>({
    initialValues: {
      name: "",
    },
  });

  const submitManufacturer = async (values: ManufacturerCreateUpdateDto) => {
    const response = await api.post<ApiResponse<ManufacturerGetDto>>(
      "/api/manufacturers",
      values
    );

    if (response.data.hasErrors) {
      const formErrors: FormErrors = response.data.errors.reduce(
        (prev, curr) => {
          Object.assign(prev, { [curr.property]: curr.message });
          return prev;
        },
        {} as FormErrors
      );
      mantineForm.setErrors(formErrors);
    }

    if (response.data.data) {
      showNotification({
        message: "Manufacturer successfully created!",
        color: "green",
      });
      navigate(routes.manufacturerListing);
    }
  };

  return (
    <Container>
      <form onSubmit={mantineForm.onSubmit(submitManufacturer)}>
        <TextInput
          {...mantineForm.getInputProps("name")}
          label="Name"
          withAsterisk
        />
        <Space h={20} />
        <Flex direction={"row"}>
          <Button type="submit" color="green">Submit</Button>
          <Space w={15} />
          <Button
            type="button"
            color="red"
            onClick={() => navigate(routes.manufacturerListing)}
            variant="outline"
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Container>
  );
};
