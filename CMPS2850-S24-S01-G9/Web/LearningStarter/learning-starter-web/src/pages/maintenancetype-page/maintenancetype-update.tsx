import { Button, Container, Flex, Space, TextInput, Title } from "@mantine/core";
import { ApiResponse, MaintenanceTypeCreateUpdateDto, MaintenanceTypeGetDto } from "../../constants/types";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { FormErrors, useForm } from "@mantine/form";
import { routes } from "../../routes";


export const MaintenanceTypeUpdate = () => {
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

  const submitMaintenanceType = async (values: MaintenanceTypeCreateUpdateDto) => {
    const response = await api.put<ApiResponse<MaintenanceTypeGetDto>>(`/api/maintenance-types/${id}`, values);
    
    if (response.data.hasErrors) {
      const formErrors= response.data.errors.reduce((prev, curr) => {
          Object.assign(prev, { [curr.property]: curr.message });
          return prev;
        },
        {} as FormErrors
      );
      mantineForm.setErrors(formErrors);
      showNotification({
        message: "Error updating maintenance type",
        color: "red",
      });
    } 
    
    if (response.data.data) {
      showNotification({
        message: "Maintenance type updated successfully",
        color: "green",
      });
      navigate(routes.maintenancetypeListing);
    }
  };

  return (
    <Container>
      {maintenancetype && (
        <form onSubmit={mantineForm.onSubmit(submitMaintenanceType)}>
          
          <TextInput
            {...mantineForm.getInputProps("Id")}
            label="Id"
            withAsterisk
          />
          
          <TextInput
            {...mantineForm.getInputProps("name")}
            label="Name"
            withAsterisk
          />
    
          <Space h={20} />
          <Flex direction={"row"}>
            <Button type="submit" color="green">Submit</Button>
            <Space w={15} />
            <Button type="button" color="red" onClick={() => navigate(routes.maintenancetypeListing)} variant="outline">
              Cancel
            </Button>
          </Flex>
        </form>
      )}
    </Container>
  );
};
