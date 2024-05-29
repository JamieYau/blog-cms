import {
  Box,
  Flex,
  Heading,
  List,
  Text,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import Comment from "../../components/Comment";

export default function PostPage() {
  const { post, comments } = useLoaderData();
  return (
    <>
      <Heading>{post.title}</Heading>
      <Box border="1px solid" borderColor="gray.300" borderRadius="5px">
        <Text>author: {post.author}</Text>
        <Text>created: {new Date(post.createdAt).toLocaleString()}</Text>
        <Text>last edited: {new Date(post.updatedAt).toLocaleString()}</Text>
      </Box>
      <Box
        dangerouslySetInnerHTML={{ __html: post.content }}
        p={4}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="5px"
      />
      <Flex flexDirection="column">
        <Heading as="h3">Comments</Heading>
        <List>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment}/>
          ))}
        </List>
      </Flex>
    </>
  );
}
