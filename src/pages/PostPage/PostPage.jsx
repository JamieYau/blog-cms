import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  List,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import Comment from "../../components/Comment";
import { formattedDate } from "../../helpers";

export default function PostPage() {
  const { post, comments } = useLoaderData();
  return (
    <>
      <Heading mb={2}>{post.title}</Heading>
      <Flex mb={2}>
        <HStack>
          <Avatar name={post.author} size={"md"} />
          <Text as="b" fontSize={22}>
            {post.author}
          </Text>
        </HStack>
        <Spacer />
        <VStack alignItems="flex-end">
          <Text as="i">
            <b>created: </b>
            {formattedDate(post.createdAt)}
          </Text>
          <Text as="i">
            <b>last edited: </b>
            {formattedDate(post.updatedAt)}
          </Text>
        </VStack>
      </Flex>
      <Box
        dangerouslySetInnerHTML={{ __html: post.content }}
        p={4}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="5px"
      />
      <Flex flexDirection="column">
        <Heading as="h3" my={2}>
          Comments
        </Heading>
        <Flex as={List} flexDir="column" gap={2}>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </Flex>
      </Flex>
    </>
  );
}
