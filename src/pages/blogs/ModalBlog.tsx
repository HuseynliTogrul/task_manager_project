import {
  Button,
  Form,
  FormInstance,
  Input,
  InputRef,
  message,
  Modal,
  Space
} from "antd";
import React, { useEffect, useRef } from "react";
import { addBlogApi } from "../../services";
import type { BlogValues } from "../../types";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
    >
      {children}
    </Button>
  );
};

interface ModalBlogProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  handleCancel: () => void;
}

export function ModalBlog({
  setModalVisibility,
  rerender,
  setRerender,
  isModalOpen,
  handleCancel
}: Readonly<ModalBlogProps>): React.ReactElement {
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const onFinish = async (values: BlogValues) => {
    const result = await addBlogApi(values);
    if (result) {
      message.success("Blog created successfully");
      form.resetFields();
      setModalVisibility(false);
      setRerender(!rerender);
    }
  };

  return (
    <Modal
      title="Add new blog"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true }]}
        >
          <Input ref={inputRef} />
        </Form.Item>
        <Form.Item
          name="url"
          label="Url"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form}>Submit</SubmitButton>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
