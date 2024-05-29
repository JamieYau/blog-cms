import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  ListItem,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Comment({ comment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card
      as={ListItem}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="5px"
    >
      <CardHeader py={1}>
        <Text>{comment.author}</Text>
        <Text>{new Date(comment.createdAt).toLocaleDateString()}</Text>
      </CardHeader>
      <CardBody py={1}>
        <Text>{comment.content}</Text>
      </CardBody>
      <CardFooter justifyContent="flex-end" p={0}>
        <Button leftIcon={<EditIcon />} variant="ghost">Edit</Button>
        <Button
          onClick={onOpen}
          leftIcon={<DeleteIcon />}
          variant="ghost"
        >Delete</Button>
      </CardFooter>
    </Card>
  );
}

// Prop types validation
Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};
