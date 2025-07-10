import { Button, Container, Flex, Space, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  ManufacturerCreateUpdateDto,
  ManufacturerGetDto,
} from "../../constants/types";
import api from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { FormErrors, useForm } from "@mantine/form";
import { routes } from "../../routes";

export const ManufacturerUpdate = () => {
  const [manufacturer, setManufacturer] = useState<ManufacturerGetDto>();
  const { id } = useParams();
  const navigate = useNavigate();

  const mantineForm = useForm<ManufacturerCreateUpdateDto>({
    initialValues: manufacturer,
  });

  useEffect(() => {
    fetchManufacturer();

    async function fetchManufacturer() {
      const response = await api.get<ApiResponse<ManufacturerGetDto>>(
        `/api/manufacturers/${id}`
      );

      delete response.data.data.models;

      if (response.data.hasErrors) {
        showNotification({
          message: "Error fetching manufacturer",
          color: "red",
        });
      }

      if (response.data.data) {
        setManufacturer(response.data.data);
        mantineForm.setValues(response.data.data);
        mantineForm.resetDirty();
      }
    }
  }, [id]);

  const submitManufacturer = async (values: ManufacturerCreateUpdateDto) => {
    const response = await api.put<ApiResponse<ManufacturerGetDto>>(
      `/api/manufacturers/${id}`,
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
        message: "Manufacturer successfully updated!",
        color: "green",
      });
      navigate(routes.manufacturerListing);
    }
  };

  return (
    <Container>
      {manufacturer && (
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
      )}
    </Container>
  );
};
