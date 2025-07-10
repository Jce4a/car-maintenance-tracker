import { useEffect, useState } from "react";
import { ApiResponse, MaintenanceTaskGetDto } from "../../constants/types";
import { showNotification } from "@mantine/notifications";
import api from "../../config/axios";
import { Button, Container, Flex, Space, Table, Title } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { routes } from "../../routes";
import { createStyles } from "@mantine/emotion";
import { useNavigate } from "react-router-dom";

export const MaintenanceTaskListing = () => {
    const { classes } = useStyles();
    const [maintenancetasks, setMaintenanceTasks] = useState<MaintenanceTaskGetDto[]>();
    const navigate = useNavigate();
    useEffect(() => {
        // fetch data from server
        fetchMaintenanceTasks();

        async function fetchMaintenanceTasks() {
            const response = await api.get<ApiResponse<MaintenanceTaskGetDto[]>>("/api/maintenance-tasks")
            
            if(response.data.hasErrors) {
                showNotification({message: "Error fetching maintenancetasks."});
            }

            if(response.data.data) {
                setMaintenanceTasks(response.data.data);
            }
        }  
    }, []);
  return (
  <Container>
    <Flex direction="row" justify={"space-between"} >
        <Title order={2} >MaintenanceTasks</Title> 
        <Button onClick = { () => { navigate(routes.maintenancetaskCreate); 
        }}
        >
        <FontAwesomeIcon icon={faPlus} /> <Space w={8}/>Create Maintenance Task
        </Button>
    </Flex>

            <Space h="md" />
            {maintenancetasks && (   
    
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
                {maintenancetasks.map((maintenancetask) => {
                  return (
                    <Table.Tr key={maintenancetask.id}>
                      <Table.Td>
                        <FontAwesomeIcon
                          className={classes.iconButton}
                          icon={faPencil}
                          color="green"
                          onClick={() => {
                            navigate(
                              routes.maintenancetaskUpdate.replace(
                                ":id",
                                `${maintenancetask.id}`
                              )
                            );
                          }}
                        />
                      </Table.Td>
                      <Table.Td>{maintenancetask.id}</Table.Td>
                      <Table.Td>{maintenancetask.name}</Table.Td>
                      <Table.Td>
                        <FontAwesomeIcon
                          className={classes.iconButton}
                          icon={faTrashCan}
                          color="red"
                          onClick={() => {
                            navigate(
                              routes.maintenancetaskDelete.replace(
                                ":id",
                                `${maintenancetask.id}`
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

