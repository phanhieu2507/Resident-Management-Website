import React from "react";
import { Modal, Steps, Card, Button } from "antd";

const ResidentDetailsModal = ({
  selectedResident,
  modalVisible,
  handleModalClose,
}) => {
  const { Step } = Steps;

  // Kiểm tra selectedResident và residents trước khi truy cập
  const residents = selectedResident;

  // Đặt chủ hộ lên đầu danh sách thành viên

  const renderResidentInfoPage = (resident) => {
    return (
      <Card title={`Thông tin nhân khẩu - ID: ${resident?.id}`}>
        {/* Hiển thị thông tin của thành viên trong gia đình */}
        <p>Họ tên: {resident?.full_name}</p>
        <p>Giới tính: {resident?.gender}</p>
        <p>Ngày sinh: {resident?.date_of_birth}</p>
        <p>Nơi sinh: {resident?.place_of_birth}</p>
        <p>Dân tộc: {resident?.ethnicity}</p>
        <p>Nghề nghiệp: {resident?.occupation}</p>
        <p>Số CMND: {resident?.id_card_number}</p>
        <p>Ngày cấp CMND: {resident?.date_of_issue}</p>
        <p>Nơi cấp CMND: {resident?.place_of_issue}</p>
        <p>Tình trạng: {resident?.status}</p>
        <p>Ngày đăng ký: {resident?.date_of_register}</p>
        <p>Địa chỉ hiện tại: {resident?.current_address}</p>
        <p>Địa chỉ trước đó: {resident?.previous_address}</p>
        <p>Mối quan hệ với chủ hộ: {resident?.relationship_with_head}</p>
      </Card>
    );
  };

  return (
    <Modal
      title="Thông tin nhân khẩu"
      visible={modalVisible}
      onCancel={handleModalClose}
      footer={null}
      width={800}
    >
      <>
        <Step description={renderResidentInfoPage(residents)} />
      </>
    </Modal>
  );
};

export default ResidentDetailsModal;
