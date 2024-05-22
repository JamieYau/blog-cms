import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function PostItem({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
    const truncatedContent =
      post.content.length > 100
        ? post.content.substring(0, 100) + "..."
        : post.content;
  return (
    <Card>
      <CardHeader>
        <Flex>
          <Avatar size="sm" mr="1em"></Avatar>
          <Box>
            <Heading as="h3" size="sm">
              {post.title}
            </Heading>
            <Text>by {post.author}</Text>
            <Text>{formattedDate}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody color="gray.500">
        <Text>{truncatedContent}</Text>
      </CardBody>
      <CardFooter></CardFooter>
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
};
