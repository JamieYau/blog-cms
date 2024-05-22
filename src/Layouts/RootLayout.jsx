import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <Grid
      templateAreas={`"sidebar nav"
                        "sidebar main"
                        "sidebar footer"`}
      templateRows={"auto 1fr auto"}
      templateColumns={"auto 1fr"}
      minH="100vh"
    >
      <GridItem
        area={"nav"}
        as="nav"
        display="flex"
        p="10px"
        alignItems="center"
        bg="gray.200"
      >
        <Navbar />
      </GridItem>
      <GridItem area={"sidebar"} as="aside" p={"1em"}>
        <Sidebar></Sidebar>
      </GridItem>
      <GridItem area={"main"} as="main">
        <Outlet />
      </GridItem>
      <GridItem
        area={"footer"}
        as="footer"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="1em"
        bg="gray.200"
      >
        <Footer />
      </GridItem>
    </Grid>
  );
}
