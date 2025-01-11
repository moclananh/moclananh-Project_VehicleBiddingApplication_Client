import { Modal, ModalProps, Stack } from "@mantine/core";
import { IconXboxX } from "@tabler/icons-react";
import React from "react";
interface ErrorModalProps extends ModalProps {
  message?: string;
  body?: React.ReactNode;
}
const ErrorModal = ({ body, message, ...props }: ErrorModalProps) => {
  return (
    <Modal {...props}>
      <Stack w={"100%"} justify="center" align="center">
        <IconXboxX color="red" size="100" />
        {message}
      </Stack>
    </Modal>
  );
};

export default ErrorModal;
