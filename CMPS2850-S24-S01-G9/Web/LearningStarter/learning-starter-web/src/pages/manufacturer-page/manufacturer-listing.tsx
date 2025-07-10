import { useEffect, useState } from "react";
import { ApiResponse, ManufacturerGetDto } from "../../constants/types";
import api from "../../config/axios";
import { showNotification } from "@mantine/notifications";
import { Container, Title, Space, Table, Button, Flex } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { createStyles } from "@mantine/emotion";

export const ManufacturerListing = () => {
  const [manufacturers, setManufacturers] = useState<ManufacturerGetDto[]>();
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    fetchManufacturers();

    async function fetchManufacturers() {
      const response = await api.get<ApiResponse<ManufacturerGetDto[]>>(
        "/api/manufacturers"
      );

      if (response.data.hasErrors) {
        showNotification({ message: "Error fetching data." });
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
          Manufacturers
        </Title>
        <Button onClick={() => navigate(routes.manufacturerCreate)}>
          <FontAwesomeIcon icon={faPlus} /> <Space w={8} />
          New Manufacturer
        </Button>
      </Flex>
      <Space h="md" />
      {manufacturers && (
        <Table striped withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "40px" }}></Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th style={{ width: "40px" }}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {manufacturers.map((manufacturer) => {
              return (
                <Table.Tr key={manufacturer.id}>
                  <Table.Td>
                    <FontAwesomeIcon
                      className={classes.iconButton}
                      icon={faPencil}
                      color="green"
                      onClick={() => {
                        navigate(
                          routes.manufacturerUpdate.replace(
                            ":id",
                            `${manufacturer.id}`
                          )
                        );
                      }}
                    />
                  </Table.Td>
                  <Table.Td>{manufacturer.name}</Table.Td>
                  <Table.Td>
                    <FontAwesomeIcon
                      className={classes.iconButton}
                      icon={faTrashCan}
                      color="red"
                      onClick={() => {
                        navigate(
                          routes.manufacturerDelete.replace(
                            ":id",
                            `${manufacturer.id}`
                          )
                        );
                      }}
                    />
                  </Table.Td>
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
