import { Button, HStack, Spacer, Avatar, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import useAuth from "../contexts/useAuth";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <>
      <Spacer />
      {user ? (
        <HStack spacing="20px">
          <Avatar name={user.username} />
          <Text as="b">{user.username}</Text>
          <Button onClick={logout} variant="outline" colorScheme="teal">
            Logout
          </Button>
        </HStack>
      ) : (
        <Button colorScheme="teal" as={NavLink} to="login">
          Login
        </Button>
      )}
    </>
  );
}
