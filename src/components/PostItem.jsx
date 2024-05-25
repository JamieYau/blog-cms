import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteModal from "./DeleteModal";
import { NavLink } from "react-router-dom";

export default function PostItem({ post, onDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const truncatedContent =
    post.content.length > 100
      ? post.content.substring(0, 100) + "..."
      : post.content;

  const handleDelete = () => {
    onDelete(post._id);
    onClose();
  };

  return (
    <Card borderTop="8px" borderColor="teal.400" bg="white">
      <CardHeader>
        <Flex gap="1em">
          <Avatar size="md" mr="1em" name={post.author}></Avatar>
          <Box>
            <Heading as="h3" size="sm">
              {post.title}
            </Heading>
            <Text>by {post.author}</Text>
            <Text>{formattedDate}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody color="gray.500" pt="0">
        <Text>{truncatedContent}</Text>
      </CardBody>
      <Divider borderColor="gray.200"></Divider>
      <CardFooter>
        <HStack>
          <Button
            leftIcon={<EditIcon />}
            variant="ghost"
            as={NavLink}
            to={`/posts/${post._id}`}
          >
            Edit
          </Button>
          <Button onClick={onOpen} leftIcon={<DeleteIcon />} variant="ghost">
            Delete
          </Button>
        </HStack>
      </CardFooter>
      <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={handleDelete} />
    </Card>
  );
}

// Prop types validation
PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
