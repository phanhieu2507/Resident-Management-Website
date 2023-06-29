import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import axios from "../../api/axios";

const { Option } = Select;

const CreateFeedback = ({ feedbacks, setFeedbacks }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddFeedback = () => {
    setShowModal(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post('/feedbacks', values); // Điều chỉnh endpoint API tương ứng
      const newFeedback = response.data;
      setFeedbacks([...feedbacks, newFeedback]); // Cập nhật danh sách feedbacks với phản hồi mới
      message.success('Phản hồi đã được gửi thành công');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating feedback:', error);
      message.error('Đã xảy ra lỗi khi gửi phản hồi');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddFeedback}>
        Thêm ý kiến/phản hồi mới
      </Button>

      <Modal
        title="Thêm ý kiến/phản ánh mới"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="date"
            label="Ngày gửi"
            rules={[{ required: true, message: 'Vui lòng chọn ngày gửi' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="category"
            label="Phân loại"
            rules={[{ required: true, message: 'Vui lòng nhập phân loại' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái xử lý"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select>
              <Option value="pending">Đã tiếp nhận</Option>
              <Option value="processing">Đang xử lý</Option>
              <Option value="completed">Đã xử lý</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateFeedback;
