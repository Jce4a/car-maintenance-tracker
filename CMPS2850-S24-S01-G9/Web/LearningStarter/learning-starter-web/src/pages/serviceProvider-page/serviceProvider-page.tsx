import { useEffect, useState } from "react";
import api from "../../config/axios";
import { ServiceProviderGetDto, ApiResponse, BusinessGetDto } from "../../constants/types";
import { showNotification } from "@mantine/notifications";
import { Container, Title, Space, Table, Flex, Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { createStyles } from "@mantine/emotion";


export const ServiceProviderListing = () => {
    const {classes} = useStyles();
    const [ServiceProviders, setServiceProviders] = useState<ServiceProviderGetDto[]>();
    const [Businesses, setBusinesses] = useState<BusinessGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchServiceProvider();
        fetchBusiness();
        async function fetchServiceProvider() {
            const response = await api.get<ApiResponse<ServiceProviderGetDto[]>>(
                "/api/service-provider"
            );

            if(response.data.hasErrors){
                showNotification({message: "Error fetching Service Providers."})
            }
            
            if (response.data.data) {
                setServiceProviders(response.data.data);
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
    }, []);
    
    return (
    <Container>
        <Flex direction="row" justify="space-between">
            <Title order={2} style={{ textAlign: "center" }}>
                Service Providers
            </Title>
            <Button onClick = {() => {navigate(routes.serviceProviderCreate);}}>
                <FontAwesomeIcon
                    className={classes.iconButton}
                    icon={faPlus}
                /> 
                <Space w={8}/>
                New Service Provider
            </Button>
        </Flex>
        <Space h="md"/>
        {ServiceProviders && (
        <Table striped withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={{ width: "40px" }}></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Phone Number</Table.Th>
                    <Table.Th>Employer</Table.Th>
                    <Table.Th style={{ width: "40px" }}></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {
                ServiceProviders?.map((serviceProvider) => {
                    const business = Businesses?.find(
                        (currBusiness) =>
                          currBusiness.id === serviceProvider.businessId,
                      );
                    return (
                        <Table.Tr key={serviceProvider.id}>
                            <Table.Td><FontAwesomeIcon 
                            className={classes.iconButton}
                            icon={faPencil} 
                            color="green"
                            onClick={() =>
                                navigate(
                                    routes.serviceProviderUpdate.replace(":id", `${serviceProvider.id}`)
                                )
                            }/></Table.Td>
                            <Table.Td>{serviceProvider.name}</Table.Td>
                            <Table.Td>{serviceProvider.phoneNumber}</Table.Td>
                            <Table.Td>{business?.name || "Unknown"}</Table.Td>
                            <Table.Td><FontAwesomeIcon 
                            className={classes.iconButton}
                            icon={faTrashCan} 
                            color="red"
                            onClick={() =>
                                navigate(
                                    routes.serviceProviderDelete.replace(":id", `${serviceProvider.id}`)
                                )
                            }/></Table.Td>
                        </Table.Tr>
                    )
                })}
            </Table.Tbody>
        </Table>
        )}
    </Container>
    )
};

const useStyles = createStyles(() => {
    return{
        iconButton: {
            cursor: "pointer"
        }
    }
});