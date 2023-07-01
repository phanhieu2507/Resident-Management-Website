import React, { useState } from "react";
import { Table, notification, Modal,Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../../api/axios";
import HouseholdDetailsModal from "./HouseholdDetailsModal";
import SplitHouseholdModal from "./SplitHouseholdModal";
import UpdateHouseholdModal from "./UpdateHouseholdModal";
const Resident = ({ data,fetchData }) => {
  const [selectedEditMethod, setSelectedEditMethod] = useState(null);
  const [editMethodVisible, setEditMethodVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [splitModalVisible,setSplitModalVisible] = useState(false);
  const [updateModalVisible,setUpdateModalVisible] = useState(false);
  const [selectedHouseholdMember, setSelectedHouseholdMember] = useState(null);
  const [selectedHouseholdInfo, setSelectedHouseholdInfo] = useState(null);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã nhà",
      dataIndex: "household_id",
      key: "household_id",
    },
    {
      title: "Tên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Nơi sinh",
      dataIndex: "place_of_birth",
      key: "place_of_birth",
    },
    
    {
      title: "Nghề nghiệp",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "CCCD",
      dataIndex: "id_card_number",
      key: "id_card_number",
    },
    
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Địa chỉ thường trú hiện tại",
      dataIndex: "current_address",
      key: "current_address",
    },
    {
      title: "Địa chỉ thường trú trước",
      dataIndex: "previous_address",
      key: "previous_address",
    },
    {
      title: "Quan hệ với chủ hộ",
      dataIndex: "relationship_with_head",
      key: "relationship_with_head",
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
    setSelectedHouseholdMember(record.residents)
    setSelectedHouseholdInfo(record)
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
          setUpdateModalVisible(true);
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
      title: "Xóa nhân khẩu",
      content: "Bạn có chắc chắn muốn xóa nhân khẩu này?",
      okText: "Đồng ý",
      okButtonProps: { className: "bg-red-500 hover:bg-red-600" },
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Gửi yêu cầu DELETE đến API để xóa hộ khẩu
          const response = await axios.delete(`/residents/${record.id}`);

          // Kiểm tra và xử lý kết quả
          if (response.status === 204) {
            // Xóa thành công, có thể thực hiện các hành động phụ sau đây
            notification.success({
              message: "Xóa nhân khẩu thành công",
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
    fetchData()
    setSelectedHousehold(record);
    setModalVisible(true);
  };
  const handleSplitHousehold = (data) => {
    axios
      .post("/households/split", data)
      .then((response) => {
        // Xử lý phản hồi từ API sau khi tách hộ khẩu thành công
        console.log(response.data);
        // Hiển thị thông báo thành công
        notification.success({
          message: "Tách hộ khẩu thành công",
          duration: 3, // Thời gian hiển thị thông báo (tính bằng giây)
        });
        // Thực hiện các hành động cần thiết sau khi tách hộ khẩu thành công
        setSplitModalVisible(false);
        fetchData();
      })
      .catch((error) => {
        // Xử lý lỗi trong quá trình gửi yêu cầu hoặc nhận phản hồi từ API
        console.error(error);
        // Hiển thị thông báo lỗi
        notification.error({
          message: "Lỗi khi tách hộ khẩu",
          description: "Đã xảy ra lỗi trong quá trình tách hộ khẩu. Vui lòng thử lại.",
          duration: 5, // Thời gian hiển thị thông báo (tính bằng giây)
        });
        // Thực hiện các hành động cần thiết khi xảy ra lỗi
      });
  };
  const handleUpdateHousehold = (data) => {
    // Lấy ID của hộ khẩu
    const householdId = selectedHouseholdInfo.id;
  
    // Gửi yêu cầu PUT đến API để cập nhật thông tin hộ khẩu
    axios
      .put(`/households/${householdId}`, data)
      .then((response) => {
        // Xử lý phản hồi từ API sau khi cập nhật thành công
        console.log(response.data);
        // Hiển thị thông báo thành công
        notification.success({
          message: "Cập nhật hộ khẩu thành công",
          duration: 3, // Thời gian hiển thị thông báo (tính bằng giây)
        });
        // Thực hiện các hành động cần thiết sau khi cập nhật thành công
        setUpdateModalVisible(false);
        fetchData();
      })
      .catch((error) => {
        // Xử lý lỗi trong quá trình gửi yêu cầu hoặc nhận phản hồi từ API
        console.error(error);
        // Hiển thị thông báo lỗi
        notification.error({
          message: "Lỗi khi cập nhật hộ khẩu",
          description: "Đã xảy ra lỗi trong quá trình cập nhật hộ khẩu. Vui lòng thử lại.",
          duration: 5, // Thời gian hiển thị thông báo (tính bằng giây)
        });
        // Thực hiện các hành động cần thiết khi xảy ra lỗi
      });
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
        householdMembers={selectedHouseholdMember}
        visible={splitModalVisible}
        onCancel={() => setSplitModalVisible(false)}
        onSplit={handleSplitHousehold}
      />
      <UpdateHouseholdModal
      household={selectedHouseholdInfo}
      visible={updateModalVisible}
      onCancel={() => setUpdateModalVisible(false)}
      onSplit={handleSplitHousehold}
      onUpdate={handleUpdateHousehold}
      />
    </>
  );
};

export default Resident;
