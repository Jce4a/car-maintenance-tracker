import { Alert, Button, Container, Flex, Space, Table, TextInput, Title } from "@mantine/core";
import { ApiResponse, MaintenanceTaskCreateUpdateDto, MaintenanceTaskGetDto} from "../../constants/types";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { FormErrors, useForm } from "@mantine/form";
import { routes } from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


export const MaintenanceTaskDelete = () => {
  const [maintenancetask, setMaintenanceTask] = useState<MaintenanceTaskGetDto>();
  const {id} = useParams();
  const navigate = useNavigate();

   const mantineForm = useForm<MaintenanceTaskCreateUpdateDto>({
   initialValues: maintenancetask
  })

  useEffect(() => {
    fetchMaintenanceTask();

    async function fetchMaintenanceTask() {
      const response = await api.get<ApiResponse<MaintenanceTaskGetDto>>(`/api/maintenance-tasks/${id}`);

      if (response.data.hasErrors) {
        showNotification({
          message: "Error finding maintenance task",
          color: "red"
        });
      }

      if (response.data.data) {
        setMaintenanceTask(response.data.data);
        mantineForm.setValues(response.data.data);
        mantineForm.resetDirty();
      }
    }
}, [id]);

  const deleteMaintenanceTask = async (values: MaintenanceTaskCreateUpdateDto) => {
    const response = await api.delete<ApiResponse<MaintenanceTaskGetDto>>(`/api/maintenance-tasks/${id}`);
    
    if (response.data.hasErrors) {
      const formErrors: FormErrors = response.data.errors.reduce(
        (prev, curr) => {
          Object.assign(prev, { [curr.property]: curr.message });
          return prev;
        },
        {} as FormErrors
      );
      mantineForm.setErrors(formErrors);
      showNotification({
        message: "Error deleting maintenance task",
        color: "red",
      });
    } 
    
    if (response.data.data) {
      showNotification({
        message: "Maintenance task deleted successfully",
        color: "green",
      });
      navigate(routes.maintenancetaskListing);
    }
  };

  return (
    <Container>
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Confirm Deletion
        </Title>
      </Flex>
      <Space h="md" />
      {maintenancetask && (
        <Table striped withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>{maintenancetask.name}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      )}
      <Space h={20}/>
      <Alert icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
        Are you sure you want to delete this maintenance task?
      </Alert>
      <Space h={20} />
      <Flex direction={"row"}>
        <Button
          type="button"
          color = "green"
          onClick={() => deleteMaintenanceTask(mantineForm.values)}
        >
          Confirm
        </Button>
        <Space w={15} />
        <Button
          type="button"
          color="red"
          onClick={() => navigate(routes.maintenancetaskListing)}
          variant="outline"
        >
          Cancel
        </Button>
      </Flex>
    </Container>
  );
};

