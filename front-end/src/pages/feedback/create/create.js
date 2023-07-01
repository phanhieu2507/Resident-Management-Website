import React, { useState } from "react";
import { Form, Input, DatePicker, Button, notification, Select } from "antd";
import moment from "moment";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";

const CreateFeedback = () => {
  const navigate = useNavigate();
  const[form] = Form.useForm();
  const[feedbacks, setFeedbacks] = useState([]);
  const { Option } = Select;
  const handleCreateFormSubmit = async (values) => {
    try {
      const formattedSubmittedDate = moment(
        values.date_submitted
      ).format("YYYY-MM-DD");

      const feedback = {
        ...values,
        date_submitted: formattedSubmittedDate
      };

      const response = await axios.post("feedbacks", feedback);

      if(response.status == 201){
        notification.success({
          message: "Tạo mới thành công",
          duration: 2,
          closable: false
        });

        form.resetFields();
        navigate("/feedback");
      } else {
        notification.error({
          message: "Đã xảy ra lỗi. Vui lòng thử lại sau",
          duration: 2,
          closable: false
        });
      }
    } catch(error){
      notification.error({
        message: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      });
      console.error(error);
    }
  };
  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Thêm ý kiến/phản ánh mới</h1>
    <Form form={form} onFinish={handleCreateFormSubmit}>
      <div className="border border-gray-300 rounded p-4 mb-4">
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
              <DatePicker />
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
            <Button
              className="bg-blue-500 text-white px-4  rounded"
              type="primary"
              htmlType="submit"
            >
              Thêm mới
            </Button>
          </Form.Item>

      </div>

    </Form>
    </div>
    </>
  )
}
export default CreateFeedback
