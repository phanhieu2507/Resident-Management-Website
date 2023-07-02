import React, { useState } from "react";
import { Form, Input, DatePicker, Button, notification, Select, Modal } from "antd";

const UpdateResidentModal = ({ resident, visible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
  
      // Hiển thị thông báo xác nhận trước khi cập nhật
      Modal.confirm({
        title: "Xác nhận cập nhật",
        content: "Bạn có chắc chắn muốn cập nhật thông tin nhân khẩu?",
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
      title="Cập nhật thông tin nhân khẩu"
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
        initialValues={resident}
        layout="vertical"
        onFinish={handleUpdate}
      >
            <Form.Item
              name="status"
              label="Tình trạng"
              rules={[
                { required: true, message: "Vui lòng chọn tình trạng" },
              ]}
            >
              <Select>
                <Option value="Thường trú">Thường trú</Option>
                <Option value="Tạm trú">Tạm trú</Option>
                <Option value="Đã chuyển đi">Đã chuyển đi</Option>
                <Option value="Đã mất">Đã mất</Option>
              </Select>

            </Form.Item>
            <Form.Item
              name="current_address"
              label="Địa chỉ thường trú hiện tại"
              rules={[
                { required: true, message: "Vui lòng nhập Địa chỉ thường trú hiện tại" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="previous_address"
              label="Địa chỉ thường trú trước"
              rules={[
                { required: true, message: "Vui lòng nhập Địa chỉ thường trú trước" },
              ]}
            >
              <Input />
            </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateResidentModal;
