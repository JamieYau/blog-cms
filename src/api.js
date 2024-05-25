const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPosts() {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${BASE_URL}/posts`, { headers });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to fetch posts: " + errorData.errors);
    }

    const postsData = await response.json();
    if (!postsData.success) {
      throw new Error("Failed to fetch posts: " + postsData.errors);
    }

    const posts = postsData.data;

    // Fetch the authors in parallel
    const authorPromises = posts.map((post) =>
      fetch(`${BASE_URL}/users/${post.authorId}`).then((res) => res.json())
    );

    const authors = await Promise.all(authorPromises);

    const postsWithAuthors = posts.map((post, index) => {
      const authorData = authors[index];
      if (!authorData.success) {
        console.warn(
          `Failed to fetch author details for post ${post._id}: ${authorData.errors}`
        );
        return { ...post, author: "Unknown" };
      }
      return { ...post, author: authorData.data.username };
    });

    return postsWithAuthors;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}

// Function to fetch a single post by its postId
export async function getPost(postId) {
  try {
    // Fetch the post data from your API
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Failed to fetch posts: " + errorData.errors);
    }

    const postData = await response.json();
    if (!postData.success) {
      throw new Error("Failed to fetch post: " + postData.errors);
    }

    const post = postData.data;

    // Fetch the author's name for the post
    const authorResponse = await fetch(`${BASE_URL}/users/${post.authorId}`);
    const authorData = await authorResponse.json();

    if (!authorData.success) {
      console.warn(
        `Failed to fetch author details for post ${post._id}: ${authorData.errors}`
      );
      return { ...post, author: "Unknown" };
    }

    // Add the author's name to the post data
    return {
      ...post,
      author: authorData.data.username,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

// Function to get all comments for a post
export async function getPostComments(postId) {
  let comments;
  // Fetch the list of blog comments from your API
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    const commentsData = await response.json();
    if (!commentsData.success) {
      throw new Error("Failed to fetch comments: " + commentsData.errors);
    }
    comments = commentsData.data;

    // Fetch the author's name for each comment
    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const authorResponse = await fetch(
          `${BASE_URL}/users/${comment.authorId}`
        );
        const authorData = await authorResponse.json();

        if (!authorData.success) {
          throw new Error(
            "Failed to fetch author details for post: " + authorData.errors
          );
        }

        return {
          ...comment,
          author: authorData.data.username,
        };
      })
    );
    comments = commentsWithAuthors;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
  return comments;
}

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function postComment(postId, comment) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });
  return response.json();
}

export async function deletePostById(postId) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 204) {
      return;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}
