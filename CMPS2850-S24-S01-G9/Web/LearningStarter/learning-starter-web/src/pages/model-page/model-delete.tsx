import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import {
  ApiResponse,
  ManufacturerGetDto,
  ModelGetDto,
} from "../../constants/types";
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

export const ModelDelete = () => {
  const [model, setModel] = useState<ModelGetDto>();
  const [manufacturer, setManufacturer] = useState<ManufacturerGetDto>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchModel();

    async function fetchModel() {
      const modelResponse = await api.get<ApiResponse<ModelGetDto>>(
        `/api/models/${id}`
      );

      if (modelResponse.data.hasErrors) {
        showNotification({ message: "Error fetching model." });
      }

      if (modelResponse.data.data) {
        setModel(modelResponse.data.data);

        if (modelResponse.data.data.manufacturerId) {
          const manufacturerResponse = await api.get<
            ApiResponse<ManufacturerGetDto>
          >(`/api/manufacturers/${modelResponse.data.data.manufacturerId}`);

          if (manufacturerResponse.data.hasErrors) {
            showNotification({ message: "Error fetching manufacturer." });
          }

          if (manufacturerResponse.data.data) {
            setManufacturer(manufacturerResponse.data.data);
          }
        }
      }
    }
  }, [id]);

  const deleteModel = async () => {
    const response = await api.delete<ApiResponse<ModelGetDto>>(
      `/api/models/${id}`
    );

    if (response.data.hasErrors) {
      showNotification({ message: "Error deleting model.", color: "red" });
    }

    if (response.data.data) {
      showNotification({
        message: "Model successfully deleted!",
        color: "green",
      });
      navigate(routes.modelListing);
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
      {model && (
        <Table striped withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Manufacturer</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>{model.name}</Table.Td>
              <Table.Td>{manufacturer?.name || "Unknown"}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      )}
      <Space h={20}/>
      <Alert icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
        Are you sure you want to delete this model?
      </Alert>
      <Space h={20} />
      <Flex direction={"row"}>
        <Button type="button" color="green" onClick={() => deleteModel()}>
          Confirm
        </Button>
        <Space w={15} />
        <Button
          type="button"
          color="red"
          onClick={() => navigate(routes.modelListing)}
          variant="outline"
        >
          Cancel
        </Button>
      </Flex>
    </Container>
  );
};
