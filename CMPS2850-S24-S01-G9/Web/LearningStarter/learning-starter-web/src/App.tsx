import { Routes } from "./routes/config";
import { AuthProvider } from "./authentication/use-auth";
import {
  MantineProvider,
  Container,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import '@mantine/core/styles.css';
import { MantineEmotionProvider } from "@mantine/emotion";
import { PRIMARY_GREEN } from "./constants/theme-constants";

const theme = createTheme({
  primaryColor: 'customGreen',
  colors: {
    customGreen: [
      "#f2ffe6", "#dcffad", "#c6ff75", "#afff3c", "#99ff04",
      "#7bc000", "#619800", "#476f00", "#2c4700", "#122000"
    ]
  },
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <MantineEmotionProvider>
        <Notifications position="bottom-right" autoClose={3000} limit={5} />
        <Container fluid px={0}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </Container>
      </MantineEmotionProvider>
    </MantineProvider>
  );
}

export default App;