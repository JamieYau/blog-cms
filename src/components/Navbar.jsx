import { Button, HStack, Spacer, Avatar } from "@chakra-ui/react";

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
        <Button colorScheme="teal">Login</Button>
      )}
    </>
  );
}
