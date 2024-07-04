import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  List,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import Comment from "../../components/Comment";
import { formattedDate } from "../../helpers";
import { CheckCircleIcon, ViewOffIcon } from "@chakra-ui/icons";
import Prism from "prismjs";
import { useEffect } from "react";

export default function PostPage() {
  const { post, comments } = useLoaderData();

  useEffect(() => {
    Prism.highlightAll();
  }, [post.content]);
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
      {post.published ? (
        <HStack color="green" mb={2}>
          <CheckCircleIcon />
          <Text as="b">Published</Text>
        </HStack>
      ) : (
        <HStack color="gray" mb={2}>
          <ViewOffIcon />
          <Text as={"b"}>Unpublished</Text>
        </HStack>
      )}
      <HStack>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </HStack>
      <Flex justify="center" my={4}>
        <Image src={post.coverImageUrl} />
      </Flex>
      <Box
        className="post-content"
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
