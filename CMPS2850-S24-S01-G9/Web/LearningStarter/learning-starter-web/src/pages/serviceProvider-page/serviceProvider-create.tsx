import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Space,
  TextInput,
  Select,
  Button,
  Flex,
  Paper,
  Divider,
} from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { ApiResponse, ServiceProviderCreateUpdateDto, ServiceProviderGetDto, BusinessGetDto } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";

export const ServiceProviderCreate = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<BusinessGetDto[]>([]);

  const mantineForm = useForm<ServiceProviderCreateUpdateDto>({
    initialValues: {
      name: "",
      phoneNumber: "",
      businessId: 0,
    },
  });

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get<ApiResponse<BusinessGetDto[]>>("/api/business");
        if (!response.data.hasErrors && response.data.data) {
          setBusinesses(response.data.data);
        }
      } catch {
        showNotification({ color: "red", message: "Failed to load businesses." });
      }
    };
    fetchBusinesses();
  }, []);

  const submitServiceProvider = async (values: ServiceProviderCreateUpdateDto) => {
    const response = await api.post<ApiResponse<ServiceProviderGetDto>>("/api/service-provider", values);

    if (response.data.hasErrors) {
      const formErrors: FormErrors = response.data.errors.reduce((prev, curr) => {
        Object.assign(prev, { [curr.property]: curr.message });
        return prev;
      }, {} as FormErrors);
      mantineForm.setErrors(formErrors);
    }

    if (response.data.data) {
      showNotification({ message: "Service Provider successfully created!", color: "green" });
      navigate(routes.serviceProviderListing);
    }
  };

  return (
    <Container size="sm">
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Title order={2} mb="md">
          Create Service Provider
        </Title>
        <Divider mb="lg" />

        <form onSubmit={mantineForm.onSubmit(submitServiceProvider)}>
          <TextInput
            {...mantineForm.getInputProps("name")}
            label="Provider Name"
            withAsterisk
            mb="sm"
          />
          <TextInput
            {...mantineForm.getInputProps("phoneNumber")}
            label="Phone Number"
            mb="sm"
          />
          <Select
            label="Business"
            placeholder="Select Business"
            data={businesses.map((b) => ({ value: b.id.toString(), label: b.name }))}
            value={mantineForm.values.businessId.toString()}
            onChange={(val) => mantineForm.setFieldValue("businessId", parseInt(val ?? "0"))}
            withAsterisk
            mb="sm"
          />
          <Space h="md" />
          <Flex justify="space-between">
            <Button type="submit" color="green">
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              color="red"
              onClick={() => navigate(routes.serviceProviderListing)}
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </Paper>
    </Container>
  );
};
