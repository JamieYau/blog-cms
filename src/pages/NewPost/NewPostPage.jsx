import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../../api";
import PostForm from "../../components/PostForm";

export default function NewPostPage() {
  const navigate = useNavigate();
  const { setError } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("published", values.published || false);
      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }
      formData.append("tags", JSON.stringify(values.tags || []));

      await createPost(formData);
      navigate("/");
    } catch (error) {
      setError("root", {
        message: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return <PostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />;
}
