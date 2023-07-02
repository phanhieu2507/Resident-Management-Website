import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd';
import moment from "moment";
import axios from "../../api/axios";

const { TextArea } = Input;

const ReplyInput = ({ feedbackId, visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formattedDate = moment(values.response_date).format("YYYY-MM-DD");

      const feedbackResponse = {
        feedback_id: feedbackId,
        responder: values.responder,
        response_content: values.response_content,
        response_date: formattedDate
      };

      // Gửi phản hồi đến API
      const response = await axios.post("/feedback_responses", feedbackResponse);

      if (response.status === 201) {
        message.success('Cập nhật phản hồi thành công');
        form.resetFields();
        onSubmit();
      } else {
        message.error('Đã xảy ra lỗi. Vui lòng thử lại sau');
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau');
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Phản hồi"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button key="submit" className="bg-blue-500 text-white"type="primary" onClick={handleSubmit}>
          Cập nhật
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="responder"
          label="Người phản hồi"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên người phản hồi',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="response_content"
          label="Nội dung phản hồi"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nội dung',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="response_date"
          label="Ngày phản hồi"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn ngày phản hồi',
            },
          ]}
        >
          <DatePicker/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReplyInput;
