import React from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Divider,
  List,
  ThemeIcon,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const maintenanceSchedule = [
  {
    interval: "Every 3,000 - 5,000 miles",
    tasks: ["Change engine oil", "Inspect belts", "Check all fluids"],
    note: "Keep your engine lubricated and running smooth.",
  },
  {
    interval: "Every 15,000 miles",
    tasks: [
      "Replace air filter",
      "Inspect brake pads",
      "Check battery and cables",
    ],
    note: "Prevent dust buildup and ensure safety components are intact.",
  },
  {
    interval: "Every 30,000 miles",
    tasks: ["Change transmission fluid", "Inspect fuel system", "Rotate tires"],
    note: "Helps prolong transmission and tire life.",
  },
  {
    interval: "Every 60,000 - 100,000 miles",
    tasks: [
      "Replace timing belt",
      "Flush cooling system",
      "Check suspension components",
    ],
    note: "Major services to prevent breakdowns and costly repairs.",
  },
];

const MaintenanceGuide = () => {
  return (
    <Container size="lg" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Title order={1} mb="sm" style={{ textAlign: "center" }}>
        🛠 Maintenance Guide
      </Title>
      <Text
        style={{ textAlign: "center" }}
        color="dimmed"
        mb="xl"
        size="lg"
      >
        Follow this guide to keep your vehicle in peak condition and avoid
        expensive repairs.
      </Text>

      {maintenanceSchedule.map((section, index) => (
        <Card key={index} shadow="sm" radius="md" withBorder mb="md">
         <Group justify="space-between" style={{ marginBottom: "10px" }}>
            <Title order={3} style={{ color: "teal" }}>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginRight: 8 }}
              />
              {section.interval}
            </Title>
          </Group>
          <Divider my="sm" />
          <List
            spacing="xs"
            size="sm"
            icon={
              <ThemeIcon color="green" size={20} radius="xl">
                <FontAwesomeIcon icon={faCheckCircle} />
              </ThemeIcon>
            }
          >
            {section.tasks.map((task, i) => (
              <List.Item key={i}>{task}</List.Item>
            ))}
          </List>
          <Text mt="sm" color="yellow" style={{ fontStyle: "italic" }}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{ marginRight: 6 }}
            />
            {section.note}
          </Text>
        </Card>
      ))}
    </Container>
  );
};

export default MaintenanceGuide;