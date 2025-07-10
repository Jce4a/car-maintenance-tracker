import { Container, Flex, Title, TextInput, NumberInput, Space, Button, Alert, Table } from "@mantine/core";
import { useForm, FormErrors } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { ApiResponse, BusinessGetDto, ServiceProviderCreateUpdateDto, ServiceProviderGetDto } from "../../constants/types";
import { routes } from "../../routes";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ServiceProviderDelete = () => {
    const [ServiceProviders, setServiceProviders] = useState<ServiceProviderGetDto>();
    const [Businesses, setBusinesses] = useState<BusinessGetDto[]>();
    const {id} = useParams();
    const navigate = useNavigate();

    const mantineForm = useForm<ServiceProviderCreateUpdateDto>({
        initialValues: ServiceProviders,
    });

    useEffect(() => {
        fetchServiceProvider();
        fetchBusiness();
        async function fetchServiceProvider() {
            const response = await api.get<ApiResponse<ServiceProviderGetDto>>(
                `/api/service-provider/${id}`
            );

            if(response.data.hasErrors){
                showNotification({message: "Error finding Service Providers.", color:"red"});
            }

            if(response.data.data){
                setServiceProviders(response.data.data);
                mantineForm.setValues(response.data.data);
                mantineForm.resetDirty();
            }
        }
        async function fetchBusiness() {
            const response = await api.get<ApiResponse<BusinessGetDto[]>>(
                "/api/business"
            );

            if(response.data.hasErrors){
                showNotification({message: "Error fetching Businesses."})
            }
            
            if (response.data.data) {
                setBusinesses(response.data.data);
            }
        }
    }, [id]);

    const deleteServiceProvider = async (values: ServiceProviderCreateUpdateDto) => {
        const response = await api.delete<ApiResponse<ServiceProviderGetDto>>(
            `/api/service-provider/${id}`
        );
       
        if(response.data.hasErrors){
            showNotification({message: "Error deleting the Service Provider.", color:"red"});
        }

        if(response.data.data){
            showNotification({message: "Service Provider successfully deleted!", color:"green"})
            navigate(routes.serviceProviderListing);
        }
    };
    const business = Businesses?.find(
        (currBusiness) =>
          currBusiness.id === ServiceProviders?.businessId,
      )
    return (
        <Container>
            <Flex direction="row" justify="space-between">
                <Title order={2} style={{ textAlign: "center" }}>
                    Service Providers
                </Title>
            </Flex>
            <Space h="md"/>
            {ServiceProviders && (
                <form onSubmit={mantineForm.onSubmit(deleteServiceProvider)}>
                    <Table striped withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Phone Number</Table.Th>
                            <Table.Th>Employer</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                            <Table.Td>{ServiceProviders.name}</Table.Td>
                            <Table.Td>{ServiceProviders.phoneNumber}</Table.Td>
                            <Table.Td>{business?.name}</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Space h={20}/>
                    <Alert icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
                        Are you sure you want to delete this Service Provider?
                    </Alert>
                    <Space h={20}/>
                    <Flex direction={"row"}>
                        <Button type="submit" variant="filled" color="green">
                            Confirm
                        </Button>
                        <Space w={15}/>
                        <Button type="button" variant="outline" color="red" onClick={() => {
                            navigate(routes.serviceProviderListing);
                        }}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </form>
            )}
        </Container>
    )
}