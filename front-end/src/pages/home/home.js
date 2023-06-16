import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";
import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  notification,
} from "antd";
import Navbar from "../../components/navbar";
import moment from "moment";

const Home = () => {
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [form] = Form.useForm();
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const handleRowClick = (record) => {
    setSelectedHousehold(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
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
          message: "Tạo mới hộ khẩu thành công",
        });

        // Reset form
        form.resetFields();
        // Đóng modal
        setModalVisible(false);
        // Refresh danh sách hộ khẩu
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
  useEffect(() => {
    const getData = async () => {
      await axios.get("households").then((res) => {
        setData(res.data);
      });
    };
    getData();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số Nhà",
      dataIndex: "house_number",
      key: "house_number",
    },
    {
      title: "Đường",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "Phường/Xã",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "Quận/Huyện",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Chủ Hộ",
      dataIndex: "head_of_household",
      key: "head_of_household",
    },
    {
      title: "Kích Thước Hộ Gia Đình",
      dataIndex: "household_size",
      key: "household_size",
    },
    {
      title: "Ngày Đăng Ký Hộ Khẩu",
      dataIndex: "date_of_registration",
      key: "date_of_registration",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách hộ khẩu</h1>
          <Button
            className="bg-blue-500"
            type="primary"
            onClick={() => setCreateFormVisible(true)}
          >
            Tạo mới hộ khẩu
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
        <Modal
          title="Chi tiết hộ khẩu"
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedHousehold && (
            <div>
              <p>ID: {selectedHousehold.id}</p>
              <p>Số Nhà: {selectedHousehold.house_number}</p>
              <p>Đường: {selectedHousehold.street}</p>
              <p>Phường/Xã: {selectedHousehold.ward}</p>
              <p>Quận/Huyện: {selectedHousehold.district}</p>
              <p>Chủ Hộ: {selectedHousehold.head_of_household}</p>
              <p>Kích Thước Hộ Gia Đình: {selectedHousehold.household_size}</p>
              <p>
                Thành viên trong gia đình:
                <ul className="pl-40 ">
        {selectedHousehold.residents.map(resident => (
          <li className="pb-4"key={resident.id}>
            <p>Họ tên: {resident.full_name}</p>
            <p>Giới tính: {resident.gender}</p>
            <p>Ngày sinh: {resident.date_of_birth}</p>
            <p>Nơi sinh: {resident.place_of_birth}</p>
            {/* Hiển thị các thông tin khác của resident */}
          </li>
        ))}
      </ul>
              </p>
              {/* Thêm các thông tin chi tiết khác tương ứng với bảng household */}
            </div>
          )}
        </Modal>
        <Modal
          title="Tạo mới hộ khẩu"
          visible={createFormVisible}
          onCancel={() => {
            form.resetFields();
            setCreateFormVisible(false);
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

            <Form.Item>
              <Button className="bg-blue-500" type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Home;
