import { getPosts } from "../../api";

export default async function DashboardLoader() {
  const posts = await getPosts(); // Fetch posts data from your API
  return posts;
}
