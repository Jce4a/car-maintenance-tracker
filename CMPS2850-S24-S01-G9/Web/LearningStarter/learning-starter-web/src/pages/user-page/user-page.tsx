import { Container, Divider, Flex, Text, Title, Button, Paper } from "@mantine/core";
import { useUser } from "../../authentication/use-auth";
import { createStyles } from "@mantine/emotion";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

const useStyles = createStyles(() => ({
  userPageContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
    padding: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
  },
  labelText: {
    marginRight: "10px",
    fontWeight: 500,
    color: "#495057",
  },
  row: {
    marginBottom: "1rem",
  },
  button: {
    marginTop: "2rem",
    backgroundColor: "#228be6",
    "&:hover": {
      backgroundColor: "#1c7ed6",
    },
  },
}));

export const UserPage = () => {
  const user = useUser();
  const { classes } = useStyles();

  return (
    <Container className={classes.userPageContainer}>
      <Paper className={classes.card} withBorder>
      <Title order={2} style={{ textAlign: "center", marginBottom: "1rem" }}>
  My Information
</Title>
        <Divider mb="xl" />
        <Flex direction="column" gap="sm">
          <Flex direction="row" className={classes.row}>
            <Text className={classes.labelText}>First Name:</Text>
            <Text>{user.firstName}</Text>
          </Flex>
          <Flex direction="row" className={classes.row}>
            <Text className={classes.labelText}>Last Name:</Text>
            <Text>{user.lastName}</Text>
          </Flex>
        </Flex>
        <Link to={routes.myCars}>
        <Button fullWidth radius="xl" style={{ backgroundColor: "black", color: "white" }}>
            Go to My Cars
          </Button>
        </Link>
      </Paper>
    </Container>
  );
};