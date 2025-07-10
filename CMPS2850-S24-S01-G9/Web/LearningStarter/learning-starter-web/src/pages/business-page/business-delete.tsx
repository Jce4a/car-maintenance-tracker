import { Container, Flex, Title, TextInput, NumberInput, Space, Button, Alert, Table } from "@mantine/core";
import { useForm, FormErrors } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { ApiResponse, BusinessCreateUpdateDto, BusinessGetDto } from "../../constants/types";
import { routes } from "../../routes";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BusinessDelete = () => {
    const [Businesses, setBusinesses] = useState<BusinessGetDto>();
    const {id} = useParams();
    const navigate = useNavigate();

    const mantineForm = useForm<BusinessCreateUpdateDto>({
        initialValues: Businesses,
    });

    useEffect(() => {
        fetchBusiness();

        async function fetchBusiness() {
            const response = await api.get<ApiResponse<BusinessGetDto>>(
                `/api/business/${id}`
            );

            if(response.data.hasErrors){
                showNotification({message: "Error finding Businesses.", color:"red"});
            }

            if(response.data.data){
                setBusinesses(response.data.data);
                mantineForm.setValues(response.data.data);
                mantineForm.resetDirty();
            }
        }
    }, [id]);

    const deleteBusiness = async (values: BusinessCreateUpdateDto) => {
        const response = await api.delete<ApiResponse<BusinessGetDto>>(
            `/api/business/${id}`
        );
       
        if(response.data.hasErrors){
            showNotification({message: "Error deleting the Business.", color:"red"});
        }

        if(response.data.data){
            showNotification({message: "Business successfully deleted!", color:"green"})
            navigate(routes.businessListing);
        }
    };

    return (
        <Container>
            <Flex direction="row" justify="space-between">
                <Title order={2} style={{ textAlign: "center" }}>
                    Businesses
                </Title>
            </Flex>
            <Space h="md"/>
            {Businesses && (
                <form onSubmit={mantineForm.onSubmit(deleteBusiness)}>
                    <Table striped withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Phone Number</Table.Th>
                            <Table.Th>Address</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                            <Table.Td>{Businesses.name}</Table.Td>
                            <Table.Td>{Businesses.phoneNumber}</Table.Td>
                            <Table.Td>{Businesses.address}</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Space h={20}/>
                    <Alert icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
                        Are you sure you want to delete this Business?
                    </Alert>
                    <Space h={20}/>
                    <Flex direction={"row"}>
                        <Button type="submit" variant="filled" color="green">
                            Confirm
                        </Button>
                        <Space w={15}/>
                        <Button type="button" variant="outline" color="red" onClick={() => {
                            navigate(routes.businessListing);
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