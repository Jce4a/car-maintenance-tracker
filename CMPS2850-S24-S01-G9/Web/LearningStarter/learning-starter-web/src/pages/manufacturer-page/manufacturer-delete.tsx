import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { ApiResponse, ManufacturerGetDto } from "../../constants/types";
import { routes } from "../../routes";
import {
  Alert,
  Button,
  Container,
  Flex,
  Space,
  Table,
  Title,
} from "@mantine/core";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ManufacturerDelete = () => {
  const [manufacturer, setManufacturer] = useState<ManufacturerGetDto>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchManufacturer();

    async function fetchManufacturer() {
      const response = await api.get<ApiResponse<ManufacturerGetDto>>(
        `/api/manufacturers/${id}`
      );

      if (response.data.hasErrors) {
        showNotification({ message: "Error fetching manufacturer." });
      }

      if (response.data.data) {
        setManufacturer(response.data.data);
      }
    }
  }, [id]);

  const deleteManufacturer = async () => {
    const response = await api.delete<ApiResponse<ManufacturerGetDto>>(
      `/api/manufacturers/${id}`
    );

    if (response.data.hasErrors) {
      showNotification({
        message: "Error deleting manufacturer.",
        color: "red",
      });
    }

    if (response.data.data) {
      showNotification({
        message: "Manufacturer successfully deleted!",
        color: "green",
      });
      navigate(routes.manufacturerListing);
    }
  };

  return (
    <Container>
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Confirm Deletion
        </Title>
      </Flex>
      <Space h="md" />
      {manufacturer && (
        <Table striped withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>{manufacturer.name}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      )}
      <Space h={20}/>
      <Alert icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
        Are you sure you want to delete this manufacturer?
      </Alert>
      <Space h={20} />
      <Flex direction={"row"}>
        <Button type="button" color="green" onClick={() => deleteManufacturer()}>
          Confirm
        </Button>
        <Space w={15} />
        <Button
          type="button"
          color="red"
          onClick={() => navigate(routes.manufacturerListing)}
          variant="outline"
        >
          Cancel
        </Button>
      </Flex>
    </Container>
  );
};
