import { Button, HStack, Spacer, Avatar } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const user = null;
  return (
    <>
      <Spacer />
      {user ? (
        <HStack spacing="20px">
          <Avatar name="Jamie" />
          <Button colorScheme="teal">Logout</Button>
        </HStack>
      ) : (
        <Button colorScheme="teal">
          <NavLink to="login">Login</NavLink>
        </Button>
      )}
    </>
  );
}
