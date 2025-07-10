import { FormErrors, useForm } from "@mantine/form";
import {
  ApiResponse,
  ModelCreateUpdateDto,
  ModelGetDto,
} from "../../constants/types";
import { Button, Container, Flex, Space, TextInput } from "@mantine/core";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";

export const ModelCreate = () => {
  const navigate = useNavigate();
  const mantineForm = useForm<ModelCreateUpdateDto>({
    initialValues: {
      name: "",
      manufacturerId: 0,
    },
  });

  const submitModel = async (values: ModelCreateUpdateDto) => {
    const response = await api.post<ApiResponse<ModelGetDto>>(
      "/api/models",
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
        message: "Model successfully created!",
        color: "green",
      });
      navigate(routes.modelListing);
    }
  };

  return (
    <Container>
      <form onSubmit={mantineForm.onSubmit(submitModel)}>
        <TextInput
          {...mantineForm.getInputProps("name")}
          label="Name"
          withAsterisk
        />
        <TextInput
          {...mantineForm.getInputProps("manufacturerId")}
          label="Manufacturer Id"
          withAsterisk
        />
        <Space h={20} />
        <Flex direction={"row"}>
          <Button type="submit" color="green">Submit</Button>
          <Space w={15} />
          <Button
            type="button"
            color="red"
            onClick={() => navigate(routes.modelListing)}
            variant="outline"
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Container>
  );
};
