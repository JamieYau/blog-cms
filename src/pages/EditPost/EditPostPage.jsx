import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, updatePost } from "../../api";
import PostForm from "../../components/PostForm";
import { Flex, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createFormData } from "../../helpers";

export default function EditPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const { setError } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(postId);
        setInitialData(post);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUpdatePost = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = createFormData(values);
      await updatePost(postId, formData);
      navigate(`/posts/${postId}`);
    } catch (error) {
      setError("root", {
        message: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialData) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <PostForm
      initialValues={initialData}
      onSubmit={handleUpdatePost}
      isSubmitting={isSubmitting}
    />
  );
}
