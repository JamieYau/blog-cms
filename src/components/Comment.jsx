import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import DeleteModal from "./DeleteModal";
import { useRevalidator } from "react-router-dom";
import { deleteComment } from "../api";
import { formattedDate } from "../helpers";

export default function Comment({ comment }) {
  const revalidator = useRevalidator();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    await deleteComment(comment._id);
    onClose();
    revalidator.revalidate();
  };

  return (
    <Card
      as={ListItem}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="5px"
    >
      <CardHeader as={HStack} gap={2} pb={0}>
        <Avatar name={comment.author} size={"sm"} />
        <Text as="b">{comment.author}</Text>
        <Text as="i" pl={2} borderLeft="1px solid" borderColor="gray.300">
          {formattedDate(comment.createdAt)}
        </Text>
      </CardHeader>
      <CardBody py={1}>
        <Text>{comment.content}</Text>
      </CardBody>
      <CardFooter justifyContent="flex-end" p={0}>
        <Button leftIcon={<EditIcon />} variant="ghost">
          Edit
        </Button>
        <Button onClick={onOpen} leftIcon={<DeleteIcon />} variant="ghost">
          Delete
        </Button>
      </CardFooter>
      <DeleteModal
        type="comment"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDelete}
      />
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
