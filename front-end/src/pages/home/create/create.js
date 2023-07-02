import React, { useState } from "react";
import { Form, Input, DatePicker, Button, notification, Select } from "antd";
import moment from "moment";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";

const CreateHousehold = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);
  const { Option } = Select;
  const handleCreateFormSubmit = async (values) => {
    try {
      const formattedRegistrationDate = moment(
        values.date_of_registration
      ).format("YY-MM-DD");
      const membersArray = members.map((member) => ({
        full_name: values[`full_name_${member.id}`],
        gender: values[`gender_${member.id}`],
        date_of_birth: moment(values[`date_of_birth_${member.id}`]).format(
          "YY-MM-DD"
        ),
        place_of_birth: values[`place_of_birth_${member.id}`],
        ethnicity: values[`ethnicity_${member.id}`],
        occupation: values[`occupation_${member.id}`],
        id_card_number: values[`id_card_number_${member.id}`],
        date_of_issue: moment(values[`date_of_issue_${member.id}`]).format(
          "YY-MM-DD"
        ),
        place_of_issue: values[`place_of_issue_${member.id}`],
        status: values[`status_${member.id}`],
        current_address: values[`current_address_${member.id}`],
        previous_address: values[`previous_address_${member.id}`],
        relationship_with_head: values[`relationship_with_head_${member.id}`],
      }));
      const household = {
        ...values,
        date_of_registration: formattedRegistrationDate,
        members: membersArray,
      };
      // Gửi yêu cầu POST đến API
      const response = await axios.post("households", household);

      // Kiểm tra và xử lý kết quả
      if (response.status === 201) {
        // Tạo mới thành công, có thể thực hiện các hành động phụ sau đây
        notification.success({
          message: "Tạo mới hộ khẩu thành công",
        });

        // Reset form
        form.resetFields();
        // Điều hướng trở lại trang danh sách hộ khẩu
        navigate("/");
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
      id: members.length,
    };
    setMembers([...members, newMember]);
  };

  return (
    <div>
      <Navbar /> 

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Tạo mới hộ khẩu</h1>
        <Form form={form} onFinish={handleCreateFormSubmit}>
          <div className="border border-gray-300 rounded p-4 mb-4">
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
          </div>

          {members.map((member, idx) => (
            <div
              key={idx + 1}
              className="border border-gray-300 rounded p-4 mb-4"
            >
              <h3 className="text-xl font-semibold mb-2">
                Thành viên {idx + 1}
              </h3>
              <Form.Item
                name={`full_name_${idx}`}
                label="Họ và Tên"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`gender_${idx}`}
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`date_of_birth_${idx}`}
                label="Ngày Tháng Năm Sinh"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày tháng năm sinh",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name={`place_of_birth_${idx}`}
                label="Nơi Sinh"
                rules={[{ required: true, message: "Vui lòng nhập nơi sinh" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`ethnicity_${idx}`}
                label="Dân Tộc"
                rules={[{ required: true, message: "Vui lòng nhập dân tộc" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`occupation_${idx}`}
                label="Nghề Nghiệp"
                rules={[
                  { required: true, message: "Vui lòng nhập nghề nghiệp" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`id_card_number_${idx}`}
                label="Số CMND/CCCD"
                rules={[
                  { required: true, message: "Vui lòng nhập số CMND/CCCD" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`date_of_issue_${idx}`}
                label="Ngày Cấp"
                rules={[{ required: true, message: "Vui lòng chọn ngày cấp" }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name={`place_of_issue_${idx}`}
                label="Nơi Cấp"
                rules={[{ required: true, message: "Vui lòng nhập nơi cấp" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`status_${idx}`}
                label="Tình Trạng"
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
                name={`current_address_${idx}`}
                label="Địa Chỉ Thường Trú Hiện Tại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ thường trú hiện tại",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`previous_address_${idx}`}
                label="Địa Chỉ Thường Trú Trước Đây"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={`relationship_with_head_${idx}`}
                label="Mối Quan Hệ Với Chủ Hộ"
              >
                <Input />
              </Form.Item>
            </div>
          ))}

          <Form.Item>
            <Button
              className="bg-blue-500 text-white px-4  rounded"
              type="primary"
              onClick={handleAddMember}
            >
              Thêm thành viên
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-blue-500 text-white px-4  rounded"
              type="primary"
              htmlType="submit"
            >
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateHousehold;
