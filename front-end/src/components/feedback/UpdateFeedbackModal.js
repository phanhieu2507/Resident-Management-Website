import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import axios from "../../api/axios";

const { Option } = Select;

const UpdateFeedbackModal = ({ fetchFeedbacks, visible, feedback, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedFeedback, setUpdatedFeedback] = useState(feedback);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Gửi yêu cầu cập nhật thông tin phản hồi tới API
      await axios.put(`/feedbacks/${feedback.id}`, values); // Điều chỉnh endpoint API tương ứng

      setLoading(false);
      onClose();

      // Cập nhật thông tin feedback đã được cập nhật
      setUpdatedFeedback({ ...feedback, ...values });
      fetchFeedbacks();
    } catch (error) {
      console.error('Error updating feedback:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật ý kiến/phản ánh"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy bỏ
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          submitter: updatedFeedback.submitter,
          address: updatedFeedback.address,
          phone_number: updatedFeedback.phone_number,
          content: updatedFeedback.content,
          category: updatedFeedback.category,
          status: updatedFeedback.status,
        }}
      >
        <Form.Item
          name="submitter"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại',
            },
          ]}
        >
          <Input />
        </Form.Item>

      
        <Form.Item
          name="content"
          label="Nội dung"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nội dung',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="category"
          label="Phân loại"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập phân loại',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn trạng thái',
            },
          ]}
        >
          <Select>
            <Option value="Đã xử lý">Đã xử lý</Option>
            <Option value="Đang xử lý">Đang xử lý</Option>
            <Option value="Đã tiếp nhận">Đã tiếp nhận</Option>
            {/* Các trạng thái khác */}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFeedbackModal;
