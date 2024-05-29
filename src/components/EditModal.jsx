import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function EditModal({ isOpen, onClose, onEdit, initialContent }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      content: initialContent,
    },
  });

  const onSubmit = (data) => {
    onEdit(data.content);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Edit Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Textarea {...register("content")} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  initialContent: PropTypes.string.isRequired,
};
