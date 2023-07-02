import React, { useState } from "react";
import { Form, Input, DatePicker, Button, notification, Select } from "antd";
import moment from "moment";
import axios from "../../../api/axios";
import { useAsyncError, useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";

const CreateResident = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;

  // const [resident, setResident] = useState([])
  const handleCreateFormSubmit = async (values) => {
    const resident = {
      household_id : values.household_id,
      full_name: values.full_name,
      gender :values.gender,
      date_of_birth :moment(values.date_of_birth).format("YY-MM-DD"),
      place_of_birth: values.place_of_birth,
      ethnicity :values.ethnicity,
      date_of_registration :moment(values.date_of_registration).format("YY-MM-DD"),
      occupation : values.occupation,
      id_card_number:values.id_card_number,
      date_of_issue:moment(values.date_of_issue).format("YY-MM-DD"),
      place_of_issue:values.place_of_issue,
      status:values.status,
      current_address: values.current_address,
      previous_address: values.previous_address,
      relationship_with_head: values.relationship_with_head,
    }
    try {
   
      // Gửi yêu cầu POST đến API
      const response = await axios.post("residents", resident);

      // Kiểm tra và xử lý kết quả
      if (response.status === 201) {
        // Tạo mới thành công, có thể thực hiện các hành động phụ sau đây
        notification.success({
          message: "Tạo mới nhân khẩu thành công",
        });

        // Reset form
        form.resetFields();
        // Điều hướng trở lại trang danh sách hộ khẩu
        navigate("/residents");
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

  

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Tạo mới nhân khẩu</h1>
        <Form form={form} onFinish={handleCreateFormSubmit}>
          <div className="border border-gray-300 rounded p-4 mb-4">
            <Form.Item
              name="household_id"
              label="Mã nhà"
              rules={[{ required: true, message: "Vui lòng nhập mã nhà" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="full_name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[
                { required: true, message: "Vui lòng nhập Giới tính" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="date_of_birth"
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Ngày sinh",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="place_of_birth"
              label="Nơi sinh"
              rules={[
                { required: true, message: "Vui lòng nhập nơi sinh" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                name={`ethnicity`}
                label="Dân Tộc"
                rules={[{ required: true, message: "Vui lòng nhập dân tộc" }]}
              >
                <Input />
              </Form.Item>
            <Form.Item
              name="occupation"
              label="Nghề nghiệp"
              rules={[
                { required: true, message: "Vui lòng nhập nghề nghiệp" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="id_card_number"
              label="CCCD"
              rules={[{ required: true, message: "Vui lòng nhập CCCD" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                name={`date_of_issue`}
                label="Ngày Cấp"
                rules={[{ required: true, message: "Vui lòng chọn ngày cấp" }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name={`place_of_issue`}
                label="Nơi Cấp"
                rules={[{ required: true, message: "Vui lòng nhập nơi cấp" }]}
              >
                <Input />
                </Form.Item>
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
            <Form.Item
              name="relationship_with_head"
              label="Quan hệ với chủ hộ"
              rules={[
                { required: true, message: "Vui lòng nhập Quan hệ với chủ hộ" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>


          

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

export default CreateResident;
