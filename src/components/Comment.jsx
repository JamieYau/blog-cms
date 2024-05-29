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
import { deleteComment, updateComment } from "../api";
import { formattedDate } from "../helpers";
import EditModal from "./EditModal";

export default function Comment({ comment }) {
  const revalidator = useRevalidator();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleDelete = async () => {
    await deleteComment(comment._id);
    onDeleteClose();
    revalidator.revalidate();
  };

  const handleEdit = async (updatedContent) => {
    await updateComment(comment._id, { content: updatedContent });
    onEditClose();
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
        <Button onClick={onEditOpen} leftIcon={<EditIcon />} variant="ghost">
          Edit
        </Button>
        <Button
          onClick={onDeleteOpen}
          leftIcon={<DeleteIcon />}
          variant="ghost"
        >
          Delete
        </Button>
      </CardFooter>
      <DeleteModal
        type="comment"
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onDelete={handleDelete}
      />
      <EditModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        onEdit={handleEdit}
        initialContent={comment.content}
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
