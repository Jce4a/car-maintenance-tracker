import { useEffect, useState } from "react";
import api from "../../config/axios";
import { ApiResponse, MaintenanceTypeGetDto } from "../../constants/types";
import { showNotification } from "@mantine/notifications";
import { Button, Container, Flex, Loader, Space, Table, Title } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { createStyles } from "@mantine/emotion";

export const MaintenanceTypeListing = () => {
    const [maintenancetypes, setMaintenanceTypes] = useState<MaintenanceTypeGetDto[]>();
    const navigate = useNavigate();
    const {classes} = useStyles();
    
    useEffect ( () => {
      fetchMaintenanceTypes();
        async function fetchMaintenanceTypes() {
            const response = await api.get<ApiResponse<MaintenanceTypeGetDto[]>>("/api/maintenance-types");
            
            if(response.data.hasErrors) {
                showNotification({message:  "Error fetching maintenancetypes."});
            }

            if(response.data.data){
                setMaintenanceTypes(response.data.data);
            }
        };
    }, []);
    return (
      <Container>
            <Flex direction="row" justify={"space-between"} >
              <Title order={2} >MaintenanceTypes</Title> 
              <Button onClick = { () => { navigate(routes.maintenancetypeCreate); 
              }}
              >
                <FontAwesomeIcon icon={faPlus} /> <Space w={8}/>Create Maintenance Type
              </Button>
            </Flex>

        <Space h="md" />
        {maintenancetypes && (   

        <Table striped withTableBorder withColumnBorders>
            <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "40px" }}></Table.Th>
              <Table.Th>Id</Table.Th>
              <Table.Th >Name</Table.Th>
              <Table.Th style={{ width: "40px" }}></Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {maintenancetypes.map((maintenancetype) => {
              return (
                <Table.Tr key={maintenancetype.id}>
                  <Table.Td>
                    <FontAwesomeIcon
                      className={classes.iconButton}
                      icon={faPencil}
                      color="Green"
                      onClick={() => {
                        navigate(
                          routes.maintenancetypeUpdate.replace(
                            ":id",
                            `${maintenancetype.id}`
                          )
                        );
                      }}
                    />
                  </Table.Td>
                  <Table.Td>{maintenancetype.id}</Table.Td>
                  <Table.Td>{maintenancetype.name}</Table.Td>
                  <Table.Td>
                    <FontAwesomeIcon
                      className={classes.iconButton}
                      icon={faTrashCan}
                      color="red"
                      onClick={() => {
                        navigate(
                          routes.maintenancetypeDelete.replace(
                            ":id",
                            `${maintenancetype.id}`
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
  return{
  iconButton: {
  cursor: "pointer",
  },
}
});