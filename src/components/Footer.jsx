import { Text, Link, Icon } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Link
        href="https://github.com/JamieYau"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="0.5em"
      >
        <Icon as={FaGithub}></Icon>
        <Text>Jamie Yau</Text>
      </Link>
    </>
  );
}
