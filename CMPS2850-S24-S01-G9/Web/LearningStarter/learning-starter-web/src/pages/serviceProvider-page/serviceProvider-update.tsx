import { Container, Title, Space, Table, Flex, TextInput, NumberInput, Button } from "@mantine/core";
import { ApiResponse, ServiceProviderGetDto, ServiceProviderCreateUpdateDto } from "../../constants/types";
import api from "../../config/axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { FormErrors, useForm } from "@mantine/form";
import { routes } from "../../routes";

export const ServiceProviderUpdate = () => {
    const [ServiceProviders, setServiceProviders] = useState<ServiceProviderGetDto>();
    const {id} = useParams();
    const navigate = useNavigate();

    const mantineForm = useForm<ServiceProviderCreateUpdateDto>({
        initialValues: ServiceProviders,
    });

    useEffect(() => {
        fetchServiceProvider();

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
    }, [id]);

    const submitServiceProvider = async (values: ServiceProviderCreateUpdateDto) => {
        const response = await api.put<ApiResponse<ServiceProviderGetDto>>(
            `/api/service-provider/${id}`,
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
            //showNotification({message: "Error updating Service Providers.", color:"red"});
        }

        if(response.data.data){
            showNotification({message: "Service Provider successfully updated!", color:"green"})
            navigate(routes.serviceProviderListing);
        }
    };

    return (
        <Container>
            <Flex direction="row" justify="space-between">
                <Title order={2} style={{ textAlign: "center" }}>
                    Service Providers
                </Title>
            </Flex>
            {ServiceProviders && (
                <form onSubmit={mantineForm.onSubmit(submitServiceProvider)}>
                    <TextInput {...mantineForm.getInputProps("name")}
                        label="Name"
                        withAsterisk
                    />
                    <TextInput {...mantineForm.getInputProps("phoneNumber")}
                        label="Phone Number"
                    />
                    <NumberInput 
                        {...mantineForm.getInputProps("businessId")}
                        label="Business Id"
                        withAsterisk
                        hideControls
                    />
                    <Space h={20}/>
                    <Flex direction={"row"}>
                        <Button type="submit" variant="filled" color="green">
                            Submit
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