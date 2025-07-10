import { useEffect, useState } from "react";
import {
  Container,
  Space,
  Table,
  TextInput,
  Button,
  NumberInput,
  Select,
  Modal,
  Group,
  Title,
  Paper,
  Divider,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { ApiResponse } from "../../constants/types";

export const Cars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [models, setModels] = useState<{ id: number; name: string; manufacturerId: number }[]>([]);
  const [manufacturers, setManufacturers] = useState<{ id: number; name: string }[]>([]);
  const [selectedManufacturerId, setSelectedManufacturerId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<any>(null);
  const [newCar, setNewCar] = useState({
    userId: 1,
    modelId: 0,
    year: new Date().getFullYear(),
    plateNumber: "",
  });

  const navigate = useNavigate();
  const loggedInUserId = 1;

  useEffect(() => {
    fetchCars();
    fetchModels();
    fetchManufacturers();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.get<ApiResponse<any[]>>("/api/cars");
      if (!response.data.hasErrors && response.data.data) {
        setCars(response.data.data);
      }
    } catch {
      showNotification({ color: "red", message: "Failed to load cars." });
    }
  };

  const fetchModels = async () => {
    try {
      const response = await api.get<ApiResponse<any[]>>("/api/models");
      if (!response.data.hasErrors && response.data.data) {
        setModels(response.data.data);
      }
    } catch {
      showNotification({ message: "Error fetching models." });
    }
  };

  const fetchManufacturers = async () => {
    try {
      const response = await api.get<ApiResponse<any[]>>("/api/manufacturers");
      if (!response.data.hasErrors && response.data.data) {
        setManufacturers(response.data.data);
      }
    } catch {
      showNotification({ message: "Error fetching manufacturers." });
    }
  };

  const handleAddCar = async () => {
    try {
      const response = await api.post<ApiResponse<any>>("/api/cars", newCar);
      if (response.data.hasErrors) {
        showNotification({ message: "Error adding car." });
        return;
      }

      showNotification({
        message: "Car added successfully.",
        color: "green",
        position: "bottom-right",
      });

      fetchCars();
      setNewCar({ userId: 1, modelId: 0, year: new Date().getFullYear(), plateNumber: "" });
      setSelectedManufacturerId(null);
      setShowForm(false);
    } catch {
      showNotification({ message: "Server error." });
    }
  };

  const handleDeleteCar = async () => {
    if (!carToDelete) return;

    try {
      const response = await api.delete<ApiResponse<any>>(`/api/cars/${carToDelete.id}`);
      if (!response.data.hasErrors) {
        showNotification({
          message: "Car deleted.",
          color: "green",
          position: "bottom-right",
        });
        fetchCars();
        setDeleteModalOpen(false);
      } else {
        showNotification({ message: "Failed to delete car.", color: "red" });
      }
    } catch {
      showNotification({ message: "Server error during deletion." });
    }
  };

  const filteredModels = models.filter((model) => model.manufacturerId === selectedManufacturerId);

  return (
    <Container>
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Title order={2} style={{ marginBottom: 16, textAlign: "center" }}>My Vehicles</Title>
        <Divider mb="md" />

        <Button
          variant="light"
          fullWidth
          onClick={() => setShowForm(!showForm)}
          color={showForm ? "pink" : "customGreen"}
        >
          {showForm ? "Cancel" : "+ Add New Car"}
        </Button>

        {showForm && (
          <>
            <Select
              label="Make"
              placeholder="Select Make"
              data={manufacturers.map((m) => ({ value: m.id.toString(), label: m.name }))}
              value={selectedManufacturerId?.toString() ?? ""}
              onChange={(val) => {
                setSelectedManufacturerId(val ? parseInt(val) : null);
                setNewCar({ ...newCar, modelId: 0 });
              }}
              mt="md"
            />
            <Select
              label="Model"
              placeholder="Select Model"
              data={filteredModels.map((m) => ({ value: m.id.toString(), label: m.name }))}
              value={newCar.modelId.toString()}
              onChange={(val) => setNewCar({ ...newCar, modelId: parseInt(val ?? "0") })}
              disabled={!selectedManufacturerId}
              mt="md"
            />
            <NumberInput
              label="Year"
              value={newCar.year}
              onChange={(val) =>
                setNewCar({ ...newCar, year: typeof val === "number" ? val : new Date().getFullYear() })
              }
              mt="md"
            />
            <TextInput
              label="Plate Number"
              value={newCar.plateNumber}
              onChange={(e) => setNewCar({ ...newCar, plateNumber: e.currentTarget.value })}
              mt="md"
            />
            <Button mt="lg" fullWidth onClick={handleAddCar} color="customGreen">
              Submit Car
            </Button>
            <Space h="lg" />
          </>
        )}

        <Table striped highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Make</th>
              <th style={{ textAlign: "center" }}>Model</th>
              <th style={{ textAlign: "center" }}>Year</th>
              <th style={{ textAlign: "center" }}>Plate</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars
              .filter((car) => car.userId === loggedInUserId)
              .map((car) => (
                <tr
                  key={car.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/cars/${car.id}/maintenance`)}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 8px #ccc")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <td style={{ textAlign: "center" }}>{car.makeName ?? "Unknown"}</td>
                  <td style={{ textAlign: "center" }}>{car.modelName ?? "Unknown"}</td>
                  <td style={{ textAlign: "center" }}>{car.year}</td>
                  <td style={{ textAlign: "center" }}>{car.plateNumber}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      color="pink"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarToDelete(car);
                        setDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Modal
          opened={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Confirm Deletion"
          centered
        >
          Are you sure you want to delete this car?
          <Space h="md" />
          <Group justify="space-between">
            <Button color="pink" onClick={handleDeleteCar}>
              Yes, delete
            </Button>
            <Button variant="light" color="pink" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
          </Group>
        </Modal>
      </Paper>
    </Container>
  );
};