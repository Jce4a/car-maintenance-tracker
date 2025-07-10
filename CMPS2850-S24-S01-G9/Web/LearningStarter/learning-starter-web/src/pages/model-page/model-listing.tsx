import { useEffect, useState } from "react";
import {
  ApiResponse,
  ManufacturerGetDto,
  ModelGetDto,
} from "../../constants/types";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";
import { Container, Title, Space, Table, Button, Flex } from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";

export const ModelListing = () => {
  const [models, setModels] = useState<ModelGetDto[]>();
  const [manufacturers, setManufacturers] = useState<ManufacturerGetDto[]>();
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    fetchModels();
    fetchManufacturers();

    async function fetchModels() {
      const response = await api.get<ApiResponse<ModelGetDto[]>>("/api/models");

      if (response.data.hasErrors) {
        showNotification({ message: "Error fetching models." });
      }

      if (response.data.data) {
        setModels(response.data.data);
      }
    }

    async function fetchManufacturers() {
      const response = await api.get<ApiResponse<ManufacturerGetDto[]>>(
        "/api/manufacturers"
      );

      if (response.data.hasErrors) {
        showNotification({ message: "Error fetching manufacturers." });
      }

      if (response.data.data) {
        setManufacturers(response.data.data);
      }
    }
  }, []);

  return (
    <Container>
      <Flex direction="row" justify="space-between">
        <Title order={2} style={{ textAlign: "center" }}>
          Models
        </Title>
        <Button onClick={() => navigate(routes.modelCreate)}>
          <FontAwesomeIcon icon={faPlus} /> <Space w={8} />
          New Model
        </Button>
      </Flex>
      <Space h="md" />
      {models && (
        <Table striped withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "40px" }}></Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Manufacturer</Table.Th>
              <Table.Th style={{ width: "40px" }}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {models.map((model) => {
              const manufacturer = manufacturers?.find(
                (currManufacturer) =>
                  currManufacturer.id === model.manufacturerId
              );

              return (
                <Table.Tr key={model.id}>
                  <Table.Td>
                    <FontAwesomeIcon
                      className={classes.iconButton}
                      icon={faPencil}
                      color="green"
                      onClick={() => {
                        navigate(
                          routes.modelUpdate.replace(":id", `${model.id}`)
                        );
                      }}
                    />
                  </Table.Td>
                  <Table.Td>{model.name}</Table.Td>
                  <Table.Td>{manufacturer?.name || "Unknown"}</Table.Td>
                  <Table.Td>
                    <FontAwesomeIcon 
                        className={classes.iconButton}
                        icon={faTrashCan}
                        color="red" 
                        onClick={() => {
                            navigate(
                                routes.modelDelete.replace(":id", `${model.id}`)
                            );
                        }}/></Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
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
