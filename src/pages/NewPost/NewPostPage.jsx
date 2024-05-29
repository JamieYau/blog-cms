import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createPost } from "../../api";
import PostForm from "./PostForm";

export default function NewPostPage() {
  const navigate = useNavigate();
  const { setError, formState } = useForm();

  const handleCreatePost = async (values) => {
    formState.isSubmitting = true;
    try {
      await createPost(values);
      navigate("/");
    } catch (error) {
      setError("root", {
        message: error.message || "An error occurred. Please try again.",
      });
    } finally {
      formState.isSubmitting = false;
    }
  };

  return <PostForm onSubmit={handleCreatePost} />;
}
