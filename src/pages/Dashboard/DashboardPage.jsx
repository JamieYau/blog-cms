import { SimpleGrid, Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import PostItem from "../../components/PostItem";

export default function DashboardPage() {
  const posts = useLoaderData();
  return (
    <>
      <Heading>Dashboard</Heading>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {posts.map((post) => (
          <PostItem key={post._id} post={post}></PostItem>
        ))}
      </SimpleGrid>
    </>
  );
}
