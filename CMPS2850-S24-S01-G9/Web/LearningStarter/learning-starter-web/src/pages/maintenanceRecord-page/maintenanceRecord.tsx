import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CarGetDto,
  MaintenanceTaskGetDto,
  ServiceProviderGetDto,
  BusinessGetDto,
  ApiResponse,
} from "../../constants/types";
import api from "../../config/axios";
import {
  Container,
  Table,
  Button,
  NumberInput,
  Modal,
  Flex,
  Select,
  TextInput,
} from "@mantine/core";

const MaintenanceRecord = () => {
  const { carId } = useParams<{ carId: string }>();
  const [records, setRecords] = useState<any[]>([]);
  const [car, setCar] = useState<CarGetDto | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [tasks, setTasks] = useState<MaintenanceTaskGetDto[]>([]);
  const [providers, setProviders] = useState<ServiceProviderGetDto[]>([]);
  const [businesses, setBusinesses] = useState<BusinessGetDto[]>([]);

  const [newTask, setNewTask] = useState({
    businessName: "",
    serviceProviderName: "",
    maintenanceTaskName: "",
    maintenanceTypeName: "",
    date: new Date().toISOString(),
    mileage: 0,
    totalCost: 0,
    notes: "",
  });

  useEffect(() => {
    if (carId) {
      api.get<ApiResponse<CarGetDto>>(`/api/cars/${carId}`).then(res => {
        if (res.data?.data) setCar(res.data.data);
      });

      Promise.all([
        api.get<ApiResponse<MaintenanceTaskGetDto[]>>("/api/maintenance-tasks"),
        api.get<ApiResponse<ServiceProviderGetDto[]>>("/api/service-provider"),
        api.get<ApiResponse<BusinessGetDto[]>>("/api/business"),
      ]).then(([tasksRes, providersRes, businessesRes]) => {
        if (!tasksRes.data.hasErrors && tasksRes.data.data) setTasks(tasksRes.data.data);
        if (!providersRes.data.hasErrors && providersRes.data.data) setProviders(providersRes.data.data);
        if (!businessesRes.data.hasErrors && businessesRes.data.data) setBusinesses(businessesRes.data.data);
      });

      const savedRecords = localStorage.getItem(`maintenance-records-${carId}`);
      if (savedRecords) setRecords(JSON.parse(savedRecords));
    }
  }, [carId]);

  const handleAddTask = () => {
    const newRecord = { id: Date.now(), ...newTask };
    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem(`maintenance-records-${carId}`, JSON.stringify(updated));
    setModalOpened(false);
    setNewTask({
      businessName: "",
      serviceProviderName: "",
      maintenanceTaskName: "",
      maintenanceTypeName: "",
      date: new Date().toISOString(),
      mileage: 0,
      totalCost: 0,
      notes: "",
    });
  };

  const handleDelete = (id: number) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    localStorage.setItem(`maintenance-records-${carId}`, JSON.stringify(updated));
  };

  return (
    <Container>
      <h1>Maintenance Record for {car?.makeName} {car?.modelName}</h1>
      <Flex justify="flex-end" mb="md">
        <Button onClick={() => setModalOpened(true)}>+ Add New Task</Button>
      </Flex>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Add Maintenance Task" centered>
        <Select label="Business" data={businesses.map((b) => ({ value: b.name, label: b.name }))} value={newTask.businessName} onChange={(val) => setNewTask({ ...newTask, businessName: val ?? "" })} mt="md" />
        <Select label="Service Provider" data={providers.map((p) => ({ value: p.name, label: p.name }))} value={newTask.serviceProviderName} onChange={(val) => setNewTask({ ...newTask, serviceProviderName: val ?? "" })} mt="md" />
        <Select label="Maintenance Task" data={tasks.map((t) => ({ value: t.name, label: t.name }))} value={newTask.maintenanceTaskName} onChange={(val) => setNewTask({ ...newTask, maintenanceTaskName: val ?? "" })} mt="md" />
        <Select label="Maintenance Type" data={["Preventive", "Corrective", "Predictive"].map(t => ({ value: t, label: t }))} value={newTask.maintenanceTypeName} onChange={(val) => setNewTask({ ...newTask, maintenanceTypeName: val ?? "" })} mt="md" />
        <NumberInput label="Mileage" value={newTask.mileage} onChange={(val) => setNewTask({ ...newTask, mileage: Number(val) })} mt="md" />
        <NumberInput label="Total Cost" value={newTask.totalCost} onChange={(val) => setNewTask({ ...newTask, totalCost: Number(val) })} mt="md" />
        <TextInput label="Notes" value={newTask.notes} onChange={(e) => setNewTask({ ...newTask, notes: e.currentTarget.value })} mt="md" />
        <Button fullWidth mt="md" onClick={handleAddTask}>Submit Task</Button>
      </Modal>
      <Table striped highlightOnHover withColumnBorders mt="lg">
        <thead>
          <tr>
            <th>Business</th>
            <th>Provider</th>
            <th>Task</th>
            <th>Type</th>
            <th>Date</th>
            <th>Mileage</th>
            <th>Total</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.businessName}</td>
              <td>{r.serviceProviderName}</td>
              <td>{r.maintenanceTaskName}</td>
              <td>{r.maintenanceTypeName}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.mileage}</td>
              <td>${r.totalCost.toFixed(2)}</td>
              <td>{r.notes}</td>
              <td><Button color="red" size="xs" onClick={() => handleDelete(r.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MaintenanceRecord;
