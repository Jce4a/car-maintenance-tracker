import { Container, Text, Button, Title, Paper } from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

const useStyles = createStyles(() => ({
  homePageContainer: {
    height: "100vh",
    background: "#f0fdf4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  heroCard: {
    textAlign: "center",
    maxWidth: 1200,
    width: "100%",
    background: "white",
    padding: "7rem 5rem",
    borderRadius: "56px",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.12)",
    border: "3px solid #81C700",
  },
  button: {
    backgroundColor: "black !important", // High specificity
    color: "white !important", // Ensure text is visible
    fontFamily: "Arial, sans-serif",
    transition: "all 0.2s ease",
    fontWeight: 700,
    fontSize: "1.25rem",
    padding: "1.5rem 3rem",
    borderRadius: "50px",
    marginTop: "2.5rem",
    position: "relative",
    zIndex: 1,
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "inline-block", // Ensure Link doesn’t hide content
  },
  title: {
    fontSize: "4rem",
    fontWeight: 900,
    marginBottom: "2rem",
    lineHeight: 1.1,
    color: "#1A1A1A",
  },
  slogan: {
    fontSize: "1.75rem",
    color: "#374151",
    marginTop: "1rem",
    fontWeight: 500,
  },
}));

export const LandingPage = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.homePageContainer}>
      <Paper className={classes.heroCard} withBorder>
        <Title order={1} className={classes.title}>
          Drive Smarter, Maintain Easier
        </Title>
        <Text className={classes.slogan}>
          Track your car’s maintenance history effortlessly and never miss a service again.
        </Text>
        <Link to={routes.myCars} className={classes.link}>
       
        </Link>
      </Paper>
    </Container>
  );
};