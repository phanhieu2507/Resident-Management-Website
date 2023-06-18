import React, { useState } from "react";
import { Table, notification, Modal,Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../../api/axios";
import HouseholdDetailsModal from "../../components/home/HouseholdDetailsModal";
import SplitHouseholdModal from "./SplitHouseholdModal";
const HouseholdTable = ({ data,fetchData }) => {
  const [selectedEditMethod, setSelectedEditMethod] = useState(null);
  const [editMethodVisible, setEditMethodVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [splitModalVisible,setSplitModalVisible] = useState(false);
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
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(record)}}
            style={{ marginRight: 8 }}
          />
          <DeleteOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(record);
            }}
            danger
          />
        </div>
      ),
    },
  ];
 
  const handleEditClick = (record) => {
    setSelectedEditMethod(null);
    setEditMethodVisible(true);
  };

  const handleEditMethodSelect = (method) => {
    setSelectedEditMethod(method);
  };
  const handleEditMethodConfirm = () => {
    if (selectedEditMethod) {
      // Xử lý chỉnh sửa theo phương thức đã chọn
      switch (selectedEditMethod) {
        case "split":
          setSplitModalVisible(true);
          break;
        case "changeHouseholdInfo":
          // Xử lý thay đổi thông tin sổ
          break;
        case "changeResidentInfo":
          // Xử lý thay đổi thông tin nhân khẩu
          break;
        default:
          break;
      }
    }
    setEditMethodVisible(false);
  };
  
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xóa hộ khẩu",
      content: "Bạn có chắc chắn muốn xóa hộ khẩu này?",
      okText: "Đồng ý",
      okButtonProps: { className: "bg-red-500 hover:bg-red-600" },
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Gửi yêu cầu DELETE đến API để xóa hộ khẩu
          const response = await axios.delete(`/households/${record.id}`);

          // Kiểm tra và xử lý kết quả
          if (response.status === 204) {
            // Xóa thành công, có thể thực hiện các hành động phụ sau đây
            notification.success({
              message: "Xóa hộ khẩu thành công",
            });

            // Refresh danh sách hộ khẩu
              fetchData();
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
      },
    });
  };

  const handleRowClick = (record) => {
    setSelectedHousehold(record);
    setModalVisible(true);
  };
  const handleSplitHousehold = (selectedMembers) => {
    // Thực hiện xử lý tách hộ khẩu và tạo sổ hộ khẩu mới với danh sách thành viên đã chọn
    // Lưu ý: Bạn cần thực hiện các xử lý tương ứng với yêu cầu của bạn ở đây
    console.log("Danh sách thành viên đã chọn:", selectedMembers);
    // Cập nhật lại danh sách hộ khẩu và hiển thị thông báo thành công
    // ...
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <HouseholdDetailsModal
        selectedHousehold={selectedHousehold}
        modalVisible={modalVisible}
        handleModalClose={() => setModalVisible(false)}
      />
         <Modal
        title="Chọn phương thức chỉnh sửa"
        visible={editMethodVisible}
        onCancel={() => setEditMethodVisible(false)}
        onOk={handleEditMethodConfirm}
        okButtonProps = {{ className:"bg-blue-500 hover:bg-blue-600" }}
      >
        <Button
          className={selectedEditMethod === "split" ? "bg-blue-500" : ""}
          onClick={() => handleEditMethodSelect("split")}
        >
          Tách hộ
        </Button>
        <Button
        className={selectedEditMethod === "changeHouseholdInfo" ? "bg-blue-500" : ""}
          onClick={() => handleEditMethodSelect("changeHouseholdInfo")}
        >
          Thay đổi thông tin sổ
        </Button>
        <Button
           className={selectedEditMethod === "changeResidentInfo" ? "bg-blue-500" : ""}
          onClick={() => handleEditMethodSelect("changeResidentInfo")}
        >
          Thay đổi thông tin nhân khẩu
        </Button>
      </Modal>
      <SplitHouseholdModal
        householdMembers={data}
        visible={splitModalVisible}
        onCancel={() => setSplitModalVisible(false)}
        onSplit={handleSplitHousehold}
      />
    </>
  );
};

export default HouseholdTable;
