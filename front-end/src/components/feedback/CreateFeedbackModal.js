import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from "../../api/axios";

const { Option } = Select;

const CreateFeedbackModal = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Gửi yêu cầu tạo mới phản hồi tới API
      await axios.post('/feedbacks', values); // Điều chỉnh endpoint API tương ứng

      setLoading(false);
      form.resetFields();
      message.success('Tạo mới phản hồi thành công!');
    } catch (error) {
      console.error('Error creating feedback:', error);
      setLoading(false);
      message.error('Đã xảy ra lỗi khi tạo mới phản hồi!');
    }
  };

  return (
    <div>
      <h1>Tạo mới ý kiến/phản ánh</h1>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          name="date_submitted"
          label="Ngày gửi"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày gửi",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateFeedbackModal;
