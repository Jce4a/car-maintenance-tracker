import { FormErrors, useForm } from "@mantine/form";
import {
  ApiResponse,
  MaintenanceTaskCreateUpdateDto,
  MaintenanceTaskGetDto,
} from "../../constants/types";
import {
  Button,
  Container,
  Flex,
  Space,
  TextInput,
  Paper,
  Title,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";
import { routes } from "../../routes";

export const MaintenanceTaskCreate = () => {
  const navigate = useNavigate();
  const mantineForm = useForm<MaintenanceTaskCreateUpdateDto>({
    initialValues: {
      name: "",
    },
  });

  const submitMaintenanceTask = async (values: MaintenanceTaskCreateUpdateDto) => {
    const response = await api.post<ApiResponse<MaintenanceTaskGetDto>>(
      "/api/maintenance-tasks",
      values
    );

    if (response.data.hasErrors) {
      const formErrors: FormErrors = response.data.errors.reduce((prev, curr) => {
        Object.assign(prev, { [curr.property]: curr.message });
        return prev;
      }, {} as FormErrors);
      mantineForm.setErrors(formErrors);
    }

    if (response.data.data) {
      showNotification({
        message: "Maintenance task created successfully",
        color: "green",
      });
      navigate(routes.maintenancetaskListing);
    }
  };

  return (
    <Container size="sm">
      <Paper shadow="md" p="xl" radius="md" withBorder>
      <Title order={2} style={{ textAlign: "center", marginBottom: "1rem" }}>
  Create Maintenance Task
</Title>
        <Divider mb="lg" />

        <form onSubmit={mantineForm.onSubmit(submitMaintenanceTask)}>
          <TextInput
            {...mantineForm.getInputProps("name")}
            label="Task Name"
            placeholder="e.g. Brake Inspection"
            withAsterisk
          />

          <Space h={20} />

          <Flex justify="space-between">
            <Button type="submit" color="green">
              Submit
            </Button>
            <Button
              type="button"
              color="red"
              variant="outline"
              onClick={() => navigate(routes.maintenancetaskListing)}
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </Paper>
    </Container>
  );
};