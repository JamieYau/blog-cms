const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPosts() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
      credentials: "include",
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

export async function refreshToken() {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Can't refresh Token");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function postComment(postId, comment) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(comment),
  });
  return response.json();
}

export async function deletePostById(postId) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

export async function createPost(postData) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: postData, // Send FormData object directly
    });

    if (response.ok) {
      return; // Success
    }

    // Handle non-2xx responses
    let errorMessage = "An error occurred";
    if (response.status === 403) {
      errorMessage =
        "You are not authorized to perform this action. Please Login.";
    } else if (response.status === 400) {
      const errorData = await response.json();
      errorMessage = errorData.error || "Invalid request";
    } else {
      const errorData = await response.json();
      errorMessage = errorData.error || "An unexpected error occurred";
    }

    throw new Error(errorMessage);
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function deleteComment(commentId) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 204) {
      return;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}

export async function updatePost(postId, postData) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: postData,
    });

    if (response.ok) {
      return; // Success
    }

    // Handle non-2xx responses
    let errorMessage = "An error occurred";
    if (response.status === 403) {
      errorMessage =
        "You are not authorized to perform this action. Please Login.";
    } else if (response.status === 400) {
      const errorData = await response.json();
      errorMessage = errorData.error || "Invalid request";
    } else {
      const errorData = await response.json();
      errorMessage = errorData.error || "An unexpected error occurred";
    }

    throw new Error(errorMessage);
  } catch (error) {
    console.error("Error Updating post:", error);
    throw error;
  }
}

export async function updateComment(commentId, content) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(content),
    });

    if (response.ok) {
      return; // Success
    }

    // Handle non-2xx responses
    let errorMessage = "An error occurred";
    if (response.status === 403) {
      errorMessage =
        "You are not authorized to perform this action. Please Login.";
    } else if (response.status === 400) {
      const errorData = await response.json();
      errorMessage = errorData.error || "Invalid request";
    } else {
      const errorData = await response.json();
      errorMessage = errorData.error || "An unexpected error occurred";
    }

    throw new Error(errorMessage);
  } catch (error) {
    console.error("Error Updating comment:", error);
    throw error;
  }
}
