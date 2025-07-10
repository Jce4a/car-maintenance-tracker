import { Button, Container, Flex,  Space, TextInput } from '@mantine/core';
import { ApiResponse, MaintenanceTaskCreateUpdateDto, MaintenanceTaskGetDto } from '../../constants/types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import { showNotification } from '@mantine/notifications';
import { FormErrors, useForm } from '@mantine/form';
import { routes } from '../../routes';

export const MaintenanceTaskUpdate = () => {
    const [maintenancetask, setMaintenanceTask] = useState<MaintenanceTaskGetDto>();
    const {id} = useParams();
    const navigate = useNavigate();

    const mantineForm = useForm<MaintenanceTaskCreateUpdateDto>({
        initialValues: maintenancetask
    })
    
    useEffect(() => {
        // get maintenance task
        fetchMaintenanceTask();
        async function fetchMaintenanceTask() {
            const response = await api.get<ApiResponse<MaintenanceTaskGetDto>>(`/api/maintenance-tasks/${id}`);
           
            if (response.data.hasErrors) {
                showNotification({
                    message: "Error finding maintenance task",
                    color: 'red'
                });
            } 

            if (response.data.data) {
                setMaintenanceTask(response.data.data);
                mantineForm.setValues(response.data.data);
                mantineForm.resetDirty();
            }
    } 
}, [id]);

    const submitMaintenanceTask = async (values: MaintenanceTaskCreateUpdateDto) => {
        const response = await api.put<ApiResponse<MaintenanceTaskGetDto>>(`/api/maintenance-tasks/${id}`, values);
        
        if (response.data.hasErrors) {
            const formErrors = response.data.errors.reduce((prev, curr) => {
                Object.assign(prev, { [curr.property]: curr.message });
                return prev;
            }, {} as FormErrors);
            mantineForm.setErrors(formErrors);
            showNotification({
                message: "Error updating maintenance task",
                color: "red",
            });
        } 
        
        if (response.data.data) {
            showNotification({
                message: "Maintenance task updated successfully",
                color: "green",
            });
            navigate(routes.maintenancetaskListing);
        }
    }


    return (
        <Container>
              {maintenancetask && (
                <form onSubmit={mantineForm.onSubmit(submitMaintenanceTask)}>
                  
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
                    <Button type="button" color="red" onClick={() => navigate(routes.maintenancetaskListing)} variant="outline">
                      Cancel
                    </Button>
                  </Flex>
                </form>
              )}
            </Container>
    );
};