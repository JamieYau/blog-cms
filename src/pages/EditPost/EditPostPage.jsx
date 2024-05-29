import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, updatePost } from "../../api"; // Adjust the import paths as needed
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Checkbox,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";

const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(8, "Content must be at least 8 characters long"),
  published: z.boolean().optional(),
});

export default function EditPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(postId);
        setInitialData(post);
        setValue("title", post.title);
        setValue("content", post.content);
        setValue("published", post.published);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId, setValue]);

  const handleUpdatePost = async (values) => {
    try {
      await updatePost(postId, values);
      navigate(`/posts/${postId}`);
    } catch (error) {
      setError("root", {
        message: error.message || "An error occurred. Please try again.",
      });
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
    <form onSubmit={handleSubmit(handleUpdatePost)}>
      <FormControl isInvalid={errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="Title"
          defaultValue={initialData.title}
          {...register("title")}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.content}>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Editor
          apiKey={TINYMCE_API_KEY}
          id="content"
          initialValue={initialData.content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "link",
              "lists",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          onEditorChange={(content) => {
            setValue("content", content, { shouldValidate: true });
          }}
        />
        <FormErrorMessage>
          {errors.content && errors.content.message}
        </FormErrorMessage>
      </FormControl>
      <Flex mt={4}>
        <Checkbox
          {...register("published")}
          isChecked={watch("published")}
          onChange={(e) => setValue("published", e.target.checked)}
        >
          Publish
        </Checkbox>
      </Flex>
      <FormControl isInvalid={errors.root}>
        <FormErrorMessage>
          {errors.root && errors.root.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
