import { Flex, Text, Link } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Flex as="footer" justifyContent="center" alignItems="center" p="1em" bg="gray.200">
      <Link
        href="https://github.com/JamieYau"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="0.5em"
      >
        <FaGithub />
        <Text>Jamie Yau</Text>
      </Link>
    </Flex>
  );
}
