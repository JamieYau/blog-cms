import { Button, Flex, HStack, Spacer, Avatar, Image } from "@chakra-ui/react";
import logo from "../assets/logo1crop.png";

export default function NavBar() {
  const user = null;
  return (
    <Flex as="nav" p="10px" alignItems="center" bg="gray.200">
      <Image src={logo} alt="DevBlog" height="40px"></Image>
      <Spacer />
      {user ? (
        <HStack spacing="20px">
          <Avatar name="Jamie" />
          <Button colorScheme="teal">Logout</Button>
        </HStack>
      ) : (
        <Button colorScheme="teal">Login</Button>
      )}
    </Flex>
  );
}
