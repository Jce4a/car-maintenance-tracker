import { Container, Title, Space, Table, Button, Flex } from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Manufacturers
        </Title>
        <Button onClick={() => navigate(routes.manufacturerListing)}>
          View/Edit
        </Button>
      </Flex>
      <Space h="lg" />
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Models
        </Title>
        <Button onClick={() => navigate(routes.modelListing)}>View/Edit</Button>
      </Flex>
      <Space h="lg" />
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Maintenance Types
        </Title>
        <Button onClick={() => navigate(routes.maintenancetypeListing)}>
          View/Edit
        </Button>
      </Flex>
      <Space h="lg" />
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Maintenance Tasks
        </Title>
        <Button onClick={() => navigate(routes.maintenancetaskListing)}>
          View/Edit
        </Button>
      </Flex>
      <Space h="lg" />
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Service Providers
        </Title>
        <Button onClick={() => navigate(routes.serviceProviderListing)}>
          View/Edit
        </Button>
      </Flex>
      <Space h="lg" />
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Businesses
        </Title>
        <Button onClick={() => navigate(routes.businessListing)}>
          View/Edit
        </Button>
      </Flex>
      <Space h="lg" />
    </Container>
  );
};

const useStyles = createStyles(() => {
  return {
    iconButton: {
      cursor: "pointer",
    },
  };
});
