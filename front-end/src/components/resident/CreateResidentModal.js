import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Button, notification } from "antd";
import moment from "moment";
import axios from "../../api/axios";

const CreateResidentModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);
  const handleCreateFormSubmit = async (values) => {
    try {
      const formattedDate = moment(values.date_of_registration).format(
        "YY-MM-DD"
      );
      const household = {
        ...values,
        date_of_registration: formattedDate,
      };
      // Gửi yêu cầu POST đến API
      const response = await axios.post("households", household);

      // Kiểm tra và xử lý kết quả
      if (response.status === 201) {
        // Tạo mới thành công, có thể thực hiện các hành động phụ sau đây
        notification.success({
          message: "Tạo mới nhân khẩu thành công",
        });

        // Reset form
        form.resetFields();
        // Đóng modal
        onClose();
        // Refresh danh sách hộ khẩu
        //  getData();
      } else {
        // Xử lý khi gặp lỗi khác
        notification.error({
          message: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      // Xử lý khi gặp lỗi
      notification.error({
        message: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      });
      console.error(error);
    }
  };
  const handleAddMember = () => {
    const newMember = {
      id: members.length + 1,
    };
    setMembers([...members, newMember]);
  };
  return (
    <Modal
      title="Tạo mới nhân khẩu"
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
    >
      <Form form={form} onFinish={handleCreateFormSubmit}>
        <Form.Item
          name="house_number"
          label="Số Nhà"
          rules={[{ required: true, message: "Vui lòng nhập số nhà" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="street"
          label="Đường"
          rules={[{ required: true, message: "Vui lòng nhập đường" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ward"
          label="Phường/Xã/Thị trấn"
          rules={[
            { required: true, message: "Vui lòng nhập phường/xã/thị trấn" },
          ]}
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

        <Form.Item
          name="head_of_household"
          label="Họ Tên Chủ Hộ"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên chủ hộ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="household_size"
          label="Số Hộ Khẩu Trong Gia Đình"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số hộ khẩu trong gia đình",
            },
          ]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item
          name="date_of_registration"
          label="Ngày Đăng Ký Hộ khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày đăng ký hộ khẩu",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        {members.map((member) => (
          <Form.Item key={member.id} label={`Thành viên ${member.id}`}>
            {/* Các trường thông tin của thành viên */}
            <Form.Item name={`full_name_${member.id}`} label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
              <Input />
            </Form.Item>
            <Form.Item name={`gender_${member.id}`} label="Giới tính" rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
              <Input />
            </Form.Item>
            {/* Các trường thông tin khác của thành viên */}
          </Form.Item>
        ))}

        <Form.Item>
          <Button className="bg-blue-500" type="primary" onClick={handleAddMember}>
            Thêm thành viên
          </Button>
        </Form.Item>
        <Form.Item>
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateResidentModal;