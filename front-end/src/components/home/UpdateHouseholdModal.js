import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";

const UpdateHouseholdModal = ({ household, visible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
  
      // Hiển thị thông báo xác nhận trước khi cập nhật
      Modal.confirm({
        title: "Xác nhận cập nhật",
        content: "Bạn có chắc chắn muốn cập nhật thông tin hộ khẩu?",
        onOk() {
          onUpdate(values)
          setLoading(false)
          onCancel()
        },
        okButtonProps: { className: "bg-yellow-500 hover:bg-yellow-600" },
        onCancel() {
                  setLoading(false)
                  onCancel()
                },
      });
    } catch (error) {
      console.log("Validation failed", error);
      setLoading(false)

    }
  };
  return (
    <Modal
      title="Cập nhật thông tin hộ khẩu"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="update"
          type="primary"
          className="bg-blue-500"
          onClick={handleUpdate}
          loading={loading}
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={household}
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="house_number"
          label="Số nhà"
          rules={[{ required: true, message: "Vui lòng nhập số nhà" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="street"
          label="Đường"
          rules={[{ required: true, message: "Vui lòng nhập tên đường" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ward"
          label="Phường/Xã/Thị trấn"
          rules={[{ required: true, message: "Vui lòng nhập phường/xã/thị trấn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="district"
          label="Quận/Huyện"
          rules={[{ required: true, message: "Vui lòng nhập quận/huyện" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateHouseholdModal;
