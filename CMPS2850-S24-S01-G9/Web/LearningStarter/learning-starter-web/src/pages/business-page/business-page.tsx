import { useEffect, useState } from "react";
import api from "../../config/axios";
import { BusinessGetDto, ApiResponse } from "../../constants/types";
import { showNotification } from "@mantine/notifications";
import { Container, Title, Space, Table, Flex, Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { createStyles } from "@mantine/emotion";


export const BusinessListing = () => {
    const {classes} = useStyles();
    const [Businesses, setBusinesses] = useState<BusinessGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBusiness();

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
                Businesses
            </Title>
            <Button onClick = {() => {navigate(routes.businessCreate);}}>
                <FontAwesomeIcon
                    className={classes.iconButton}
                    icon={faPlus}
                /> 
                <Space w={8}/>
                New Business
            </Button>
        </Flex>
        <Space h="md"/>
        {Businesses && (
        <Table striped withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th style={{ width: "40px" }}></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Phone Number</Table.Th>
                    <Table.Th>Address</Table.Th>
                    <Table.Th style={{ width: "40px" }}></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {Businesses?.map((business) => {
                    return (
                        <Table.Tr key={business.id}>
                            <Table.Td><FontAwesomeIcon 
                            className={classes.iconButton}
                            icon={faPencil}
                            color="green" 
                            onClick={() =>
                                navigate(
                                    routes.businessUpdate.replace(":id", `${business.id}`)
                                )
                            }/></Table.Td>
                            <Table.Td>{business.name}</Table.Td>
                            <Table.Td>{business.phoneNumber}</Table.Td>
                            <Table.Td>{business.address}</Table.Td>
                            <Table.Td><FontAwesomeIcon 
                            className={classes.iconButton}
                            icon={faTrashCan}
                            color="red"
                            onClick={() =>
                                navigate(
                                    routes.businessDelete.replace(":id", `${business.id}`)
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