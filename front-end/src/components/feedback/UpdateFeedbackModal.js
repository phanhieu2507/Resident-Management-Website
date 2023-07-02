import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification, DatePicker } from 'antd';
import axios from "../../api/axios";
import moment from 'moment';

const { Option } = Select;

const UpdateFeedbackModal = ({ fetchFeedbacks, visible, feedback, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updatedFeedback, setUpdatedFeedback] = useState(feedback);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Format the date value to "YYYY-MM-DD"
      values.date_submitted = moment(values.date_submitted).format('YYYY-MM-DD');

      // Send the update request to the API
      await axios.put(`/feedbacks/${feedback.id}`, values);

      setLoading(false);
      onClose();

      // Update the feedback information
      const updatedFeedback = { ...feedback, ...values };
      setUpdatedFeedback(updatedFeedback);
      fetchFeedbacks();

      // Display success notification
      notification.success({
        message: 'Cập nhật thành công',
        duration: 2,
        closable: false
      });
    } catch (error) {
      console.error('Error updating feedback:', error);
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
      title="Cập nhật ý kiến/phản ánh"
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
          submitter: updatedFeedback.submitter,
          address: updatedFeedback.address,
          phone_number: updatedFeedback.phone_number,
          content: updatedFeedback.content,
          category: updatedFeedback.category,
          status: updatedFeedback.status,
          date_submitted: moment(updatedFeedback.date_submitted, 'YYYY-MM-DD'),
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
          <Input placeholder="Nhập họ tên" />
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
          <Input placeholder="Nhập địa chỉ" />
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
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="date_submitted"
          label="Ngày gửi"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày gửi",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
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
          <Input.TextArea placeholder="Nhập nội dung" />
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
          <Input placeholder="Nhập phân loại" />
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
          <Select placeholder="Chọn trạng thái">
            <Option value="Đã xử lý">Đã xử lý</Option>
            <Option value="Đang xử lý">Đang xử lý</Option>
            <Option value="Đã tiếp nhận">Đã tiếp nhận</Option>
            {/* Other status options */}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFeedbackModal;