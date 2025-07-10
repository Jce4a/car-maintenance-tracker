import { Container, Title, Space, Table, Flex, TextInput, NumberInput, Button } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { ApiResponse, BusinessCreateUpdateDto, BusinessGetDto } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";

export const BusinessCreate = () => {
    const navigate = useNavigate();
    const mantineForm = useForm<BusinessCreateUpdateDto>({
        initialValues: {
            name: "",
            phoneNumber:"",
            address: ""
        }
    })
    const submitBusiness = async (values: BusinessCreateUpdateDto) => {
        const response = await api.post<ApiResponse<BusinessGetDto>>("/api/business", values);
       
        if(response.data.hasErrors){
            const formErrors: FormErrors = response.data.errors.reduce(
                (prev, curr) => {
                    Object.assign(prev, {[curr.property]:curr.message});
                    return prev;
                }, 
                {} as FormErrors
            );
            mantineForm.setErrors(formErrors);
            //showNotification({message: "Error creating Business.", color:"red"});
        }

        if(response.data.data){
            showNotification({message: "Business successfully created!", color:"green"})
            navigate(routes.businessListing);
        }
    }
    return (
        <Container>
                    <Flex direction="row" justify="space-between">
                        <Title order={2} style={{ textAlign: "center" }}>
                            Businesses
                        </Title>
                    </Flex>
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
                </Container>
    )
}