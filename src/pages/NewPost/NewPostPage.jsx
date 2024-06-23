import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../../api";
import PostForm from "../../components/PostForm";
import { createFormData } from "../../helpers";

export default function NewPostPage() {
  const navigate = useNavigate();
  const { setError } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = createFormData(values);
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
