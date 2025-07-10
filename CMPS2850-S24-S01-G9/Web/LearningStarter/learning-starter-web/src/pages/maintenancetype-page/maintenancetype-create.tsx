import { Button, Container, Flex, Space, TextInput } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";
import {
  ApiResponse,
  MaintenanceTypeCreateUpdateDto,
  MaintenanceTypeGetDto,
} from "../../constants/types";

export const MaintenanceTypeCreate = () => {
  const navigate = useNavigate();
  const mantineForm = useForm<MaintenanceTypeCreateUpdateDto>({
    initialValues: {
      name: "",
    },
  });

  const submitMaintenanceType = async (values: MaintenanceTypeCreateUpdateDto) => {
    const response = await api.post<ApiResponse<MaintenanceTypeGetDto>>("/api/maintenance-types", values);

    if (response.data.hasErrors) {
      const formErrors: FormErrors = response.data.errors.reduce((prev, curr) => {
        Object.assign(prev, { [curr.property]: curr.message });
        return prev;
      }, {} as FormErrors);
      mantineForm.setErrors(formErrors);
    }

    if (response.data.data) {
      showNotification({
        message: "Maintenance type created successfully!",
        color: "green",
      });
      navigate(routes.maintenancetypeListing);
    }
  };

  return (
    <Container size="sm">
      <form onSubmit={mantineForm.onSubmit(submitMaintenanceType)}>
        <TextInput
          {...mantineForm.getInputProps("name")}
          label="Name"
          withAsterisk
        />
        <Space h={20} />
        <Flex direction={"row"} gap={15}>
          <Button type="submit" color="green">Submit</Button>
          <Button
            type="button"
            color="red"
            onClick={() => navigate(routes.maintenancetypeListing)}
            variant="outline"
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Container>
  );
};