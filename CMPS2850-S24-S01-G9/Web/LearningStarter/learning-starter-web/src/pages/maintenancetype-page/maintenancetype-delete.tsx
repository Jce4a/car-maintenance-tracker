import { Alert, Button, Container, Flex, Space, Table, TextInput, Title } from "@mantine/core";
import { ApiResponse, MaintenanceTypeCreateUpdateDto, MaintenanceTypeGetDto } from "../../constants/types";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { FormErrors, useForm } from "@mantine/form";
import { routes } from "../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


export const MaintenanceTypeDelete = () => {
  const [maintenancetype, setMaintenanceType] = useState<MaintenanceTypeGetDto>();
  const {id} = useParams();
  const navigate = useNavigate();

   const mantineForm = useForm<MaintenanceTypeCreateUpdateDto>({
   initialValues: maintenancetype
  })

  useEffect(() => {
    fetchMaintenanceType();

    async function fetchMaintenanceType() {
      const response = await api.get<ApiResponse<MaintenanceTypeGetDto>>(`/api/maintenance-types/${id}`);

      if (response.data.hasErrors) {
        showNotification({
          message: "Error finding maintenance type",
          color: "red"
        });
      }

      if (response.data.data) {
        setMaintenanceType(response.data.data);
        mantineForm.setValues(response.data.data);
        mantineForm.resetDirty();
      }
    }
}, [id]);

  const deleteMaintenanceType = async (values: MaintenanceTypeCreateUpdateDto) => {
    const response = await api.delete<ApiResponse<MaintenanceTypeGetDto>>(`/api/maintenance-types/${id}`);
    
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
        message: "Error deleting maintenance type",
        color: "red",
      });
    } 
    
    if (response.data.data) {
      showNotification({
        message: "Maintenance type deleted successfully",
        color: "green",
      });
      navigate(routes.maintenancetypeListing);
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
      {maintenancetype && (
        <Table striped withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>{maintenancetype.name}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      )}
      <Space h={20}/>
      <Alert icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
        Are you sure you want to delete this maintenance type?
      </Alert>
      <Space h={20} />
      <Flex direction={"row"}>
        <Button
          type="button"
          color="green"
          onClick={() => deleteMaintenanceType(mantineForm.values)}
        >
          Confirm
        </Button>
        <Space w={15} />
        <Button
          type="button"
          color="red"
          onClick={() => navigate(routes.maintenancetypeListing)}
          variant="outline"
        >
          Cancel
        </Button>
      </Flex>
    </Container>
  );
};

