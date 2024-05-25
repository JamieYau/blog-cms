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
          <Button onClick={logout} colorScheme="teal">
            Logout
          </Button>
        </HStack>
      ) : (
        <Button colorScheme="teal">
          <NavLink to="login">Login</NavLink>
        </Button>
      )}
    </>
  );
}
