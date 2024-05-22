import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Flex } from "@chakra-ui/react";

export default function RootLayout() {
  return (
    <Flex direction="column" minHeight="100vh">
      <NavBar />
      <Outlet />
      <Footer />
    </Flex>
  );
}
