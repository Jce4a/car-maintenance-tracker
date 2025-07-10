import { Button, Container, Flex, Space, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  ModelCreateUpdateDto,
  ModelGetDto,
} from "../../constants/types";
import api from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { FormErrors, useForm } from "@mantine/form";
import { routes } from "../../routes";

export const ModelUpdate = () => {
  const [model, setModel] = useState<ModelGetDto>();
  const { id } = useParams();
  const navigate = useNavigate();

  const mantineForm = useForm<ModelCreateUpdateDto>({
    initialValues: model,
  });

  useEffect(() => {
    fetchModel();

    async function fetchModel() {
      const response = await api.get<ApiResponse<ModelGetDto>>(
        `/api/models/${id}`
      );

      if (response.data.hasErrors) {
        showNotification({ message: "Error fetching model", color: "red" });
      }

      if (response.data.data) {
        setModel(response.data.data);
        mantineForm.setValues(response.data.data);
        mantineForm.resetDirty();
      }
    }
  }, [id]);

  const submitModel = async (values: ModelCreateUpdateDto) => {
    const response = await api.put<ApiResponse<ModelGetDto>>(
      `/api/models/${id}`,
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
        message: "Model successfully updated!",
        color: "green",
      });
      navigate(routes.modelListing);
    }
  };

  return (
    <Container>
      {model && (
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
      )}
    </Container>
  );
};
