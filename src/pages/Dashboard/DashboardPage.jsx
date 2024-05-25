import { SimpleGrid, Heading } from "@chakra-ui/react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import PostItem from "../../components/PostItem";
import { deletePostById } from "../../api";

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
      <Heading>Dashboard</Heading>
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
