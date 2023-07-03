import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from "../../api/axios";
import moment from 'moment';

const { Option } = Select;

const UpdateResponseModal = ({ fetchResponses, visible, response, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedResponse, setUpdatedResponse] = useState(response);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Format the date value to "YYYY-MM-DD"
      values.response_date = moment(values.response_date).format('YYYY-MM-DD');

      // Send the update request to the API
      await axios.put(`/feedback_responses/${response.id}`, values);

      setLoading(false);
      onClose();

      // Update the feedback information
      const updatedResponse = { ...response, ...values };
      setUpdatedResponse(updatedResponse);
      fetchResponses();

      // Display success notification
      notification.success({
        message: 'Cập nhật thành công',
        duration: 2,
        closable: false
      });
    } catch (error) {
      console.error('Error updating response:', error);
      setLoading(false);

      // Display error notification
      notification.error({
        message: 'Cập nhật không thành công',
        duration: 2,
        closable: false
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật phản hồi"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-blue-500 hover:bg-blue-600"
          loading={loading}
          onClick={handleSubmit}
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          responder : updatedResponse?.responder,
          response_content : updatedResponse?.response_content,
          response_date: moment(updatedResponse?.response_date, 'YYYY-MM-DD'),
        }}
      >
        <Form.Item
          name="responder"
          label="Người phản hồi"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên',
            },
          ]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="response_content"
          label="Nội dung phản hồi"
          rules={[
            {
              required: true,
              message: 'Vui lòng nội dung',
            },
          ]}
        >
          <Input.TextArea placeholder="Nhập nội dung" />
        </Form.Item>

        <Form.Item
          name="response_date"
          label="Ngày phản hồi"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày phản hồi",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateResponseModal;
