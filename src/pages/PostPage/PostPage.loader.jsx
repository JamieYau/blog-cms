import { getPost, getPostComments } from "../../api";

export default async function postLoader({ params }) {
  const post = await getPost(params.postId); // Fetch posts data from your API
  const comments = await getPostComments(params.postId);
  return { post, comments };
}
