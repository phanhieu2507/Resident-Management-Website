import React, { useState } from "react";
import { Modal, Steps, Card, Button } from "antd";

const HouseholdDetailsModal = ({ selectedHousehold, modalVisible, handleModalClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { Step } = Steps;
  const renderHouseholdInfoPage = () => {
    return (
        
      <Card title="Thông tin hộ khẩu">
        {/* Hiển thị thông tin của hộ khẩu */}
        <p>ID: {selectedHousehold.id}</p>
        <p>Số Nhà: {selectedHousehold.house_number}</p>
        <p>Đường: {selectedHousehold.street}</p>
        <p>Phường/Xã: {selectedHousehold.ward}</p>
        <p>Quận/Huyện: {selectedHousehold.district}</p>
        <p>Chủ Hộ: {selectedHousehold.residents.find((resident) => resident.id === selectedHousehold.head_of_household).full_name}</p>
        <p>Kích Thước Hộ Gia Đình: {selectedHousehold.household_size}</p>
        <p>Ngày Đăng Ký Hộ Khẩu: {selectedHousehold.date_of_registration}</p>
      </Card>
    );
  };
  
  const renderResidentInfoPage = (resident) => {
    return (
      <Card title={`Thông tin thành viên - ID: ${resident.id}`}>
        {/* Hiển thị thông tin của thành viên trong gia đình */}
        <p>Họ tên: {resident.full_name}</p>
        <p>Giới tính: {resident.gender}</p>
        <p>Ngày sinh: {resident.date_of_birth}</p>
        <p>Nơi sinh: {resident.place_of_birth}</p>
        <p>Dân tộc: {resident.ethnicity}</p>
        <p>Nghề nghiệp: {resident.occupation}</p>
        <p>Số CMND: {resident.id_card_number}</p>
        <p>Ngày cấp CMND: {resident.date_of_issue}</p>
        <p>Nơi cấp CMND: {resident.place_of_issue}</p>
        <p>Tình trạng: {resident.status}</p>
        <p>Ngày đăng ký: {resident.date_of_register}</p>
        <p>Địa chỉ hiện tại: {resident.current_address}</p>
        <p>Địa chỉ trước đó: {resident.previous_address}</p>
        <p>Mối quan hệ với chủ hộ: {resident.relationship_with_head}</p>
      </Card>
    );
  };
  

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Modal
      title="Sổ hộ khẩu"
      visible={modalVisible}
      onCancel={handleModalClose}
      footer={null}
      width={800}
    >
      {selectedHousehold && (
        <>
          {currentPage === 0 ? (
            // Trang thông tin hộ khẩu
            <Step  description={renderHouseholdInfoPage()} />
          ) : (
            // Các trang thông tin thành viên trong gia đình
            <Step
              title={`Thành viên - ID: ${selectedHousehold.residents[currentPage - 1].id}`}
              description={renderResidentInfoPage(selectedHousehold.residents[currentPage - 1])}
            />
          )}

          <div style={{ marginTop: "16px", textAlign: "right" }}>
            {currentPage > 0 && (
              <Button style={{ marginRight: "8px" }} onClick={handlePreviousPage}>
                Trang trước
              </Button>
            )}
            {currentPage < selectedHousehold.residents.length && (
              <Button className="bg-blue-500" type="primary"  onClick={handleNextPage}>
                Trang tiếp theo
              </Button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default HouseholdDetailsModal;
