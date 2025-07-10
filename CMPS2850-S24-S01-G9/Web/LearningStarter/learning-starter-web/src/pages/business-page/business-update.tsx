import { Container, Title, Space, Table, Flex, TextInput, NumberInput, Button } from "@mantine/core";
import { ApiResponse, BusinessGetDto, BusinessCreateUpdateDto } from "../../constants/types";
import api from "../../config/axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { FormErrors, useForm } from "@mantine/form";
import { routes } from "../../routes";

export const BusinessUpdate = () => {
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

    const submitBusiness = async (values: BusinessCreateUpdateDto) => {
        const response = await api.put<ApiResponse<BusinessGetDto>>(
            `/api/business/${id}`,
            values
        );
       
        if(response.data.hasErrors){
            const formErrors: FormErrors = response.data.errors.reduce(
                (prev, curr) => {
                    Object.assign(prev, {[curr.property]:curr.message});
                    return prev;
                }, 
                {} as FormErrors
            );
            mantineForm.setErrors(formErrors);
            //showNotification({message: "Error updating Business.", color:"red"});
        }

        if(response.data.data){
            showNotification({message: "Business successfully updated!", color:"green"})
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
            {Businesses && (
                <form onSubmit={mantineForm.onSubmit(submitBusiness)}>
                    <TextInput {...mantineForm.getInputProps("name")}
                        label="Name"
                        withAsterisk
                    />
                    <TextInput {...mantineForm.getInputProps("phoneNumber")}
                        label="Phone Number"
                    />
                    <TextInput {...mantineForm.getInputProps("address")}
                        label="Address"
                    />
                    <Space h={20}/>
                    <Flex direction={"row"}>
                        <Button type="submit" variant="filled" color="green">
                            Submit
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