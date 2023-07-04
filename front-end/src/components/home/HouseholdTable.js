import React, { useState, useEffect } from "react";
import { Table, notification, Modal,Button,Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../../api/axios";
import HouseholdDetailsModal from "../../components/home/HouseholdDetailsModal";
import SplitHouseholdModal from "./SplitHouseholdModal";
import UpdateHouseholdModal from "./UpdateHouseholdModal";
import {  useNavigate } from "react-router-dom";
const HouseholdTable = ({ data,fetchData }) => {
  const [selectedEditMethod, setSelectedEditMethod] = useState(null);
  const [editMethodVisible, setEditMethodVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [splitModalVisible,setSplitModalVisible] = useState(false);
  const [updateModalVisible,setUpdateModalVisible] = useState(false);
  const [selectedHouseholdMember, setSelectedHouseholdMember] = useState(null);
  const [selectedHouseholdInfo, setSelectedHouseholdInfo] = useState(null);
  const [modifiedData, setModifiedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu giá trị của thanh tìm kiếm
  const navigate = useNavigate();
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
      dataIndex: "head",
      key: "head",
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
  useEffect(() => {
  setModifiedData(data.map(item => {
    // Lấy id của head of household từ object hiện tại
    const headOfHouseholdId = item.head_of_household;
  
    // Tìm resident có id bằng headOfHouseholdId trong mảng residents của object hiện tại
    const headOfHousehold = item.residents.find(resident => resident.id == headOfHouseholdId);
  
    // Thêm trường "head" với giá trị là full_name của head of household vào object hiện tại
    return { ...item, head: headOfHousehold?.full_name };
  }))
  },[data])
 
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
          navigate('/residents')
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

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Lọc danh sách các hộ khẩu dựa trên tên chủ hộ
  const filteredData = modifiedData.filter((item) =>
    item.head.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
       <Input.Search
        placeholder="Tìm kiếm theo tên chủ hộ"
        allowClear
        enterButton
        onChange={(e) => handleSearch(e.target.value)} 
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
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

export default HouseholdTable;
