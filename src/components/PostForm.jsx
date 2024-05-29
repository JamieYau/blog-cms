import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";

const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(8, "Content must be at least 8 characters long"),
  published: z.boolean().optional(),
});

export default function PostForm({
  initialValues = {},
  onSubmit,
  isSubmitting,
}) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" placeholder="Title" {...register("title")} />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.content}>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Editor
          apiKey={TINYMCE_API_KEY}
          id="content"
          initialValue={initialValues.content}
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

PostForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    published: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
