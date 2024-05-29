import { SimpleGrid, Heading, Button, Flex, Spacer } from "@chakra-ui/react";
import { NavLink, useLoaderData, useRevalidator } from "react-router-dom";
import PostItem from "../../components/PostItem";
import { deletePostById } from "../../api";
import { AddIcon } from "@chakra-ui/icons";

export default function DashboardPage() {
  const posts = useLoaderData();
  const revalidator = useRevalidator();

  const handleDeletePost = async (deletedPostId) => {
    await deletePostById(deletedPostId);
    // Revalidate the loader data to refresh the list
    revalidator.revalidate();
  };

  return (
    <>
      <Flex mb={4}>
        <Heading>Dashboard</Heading>
        <Spacer></Spacer>
        <Button leftIcon={<AddIcon />} as={NavLink} to="/posts/create">Create</Button>
      </Flex>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            onDelete={handleDeletePost}
          ></PostItem>
        ))}
      </SimpleGrid>
    </>
  );
}
