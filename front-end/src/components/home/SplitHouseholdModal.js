import React, { useState } from "react";
import { Modal, Form, Radio, Button, Input, notification, DatePicker } from "antd";
import moment from "moment";

const SplitHouseholdModal = ({ householdMembers, visible, onCancel, onSplit }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newHouseholdInfo, setNewHouseholdInfo] = useState({
    house_number: "",
    street: "",
    ward: "",
    district: "",
    date_of_registration: null,
  });
  const [relationshipInfo, setRelationshipInfo] = useState({});

  const handleMemberChange = (memberId) => {
    const selected = selectedMembers.includes(memberId);

    if (selected) {
      setSelectedMembers((prevSelected) => prevSelected.filter((id) => id !== memberId));
    } else {
      setSelectedMembers((prevSelected) => [...prevSelected, memberId]);
    }
  };

  const handleSplit = () => {
    if (selectedMembers.length === 0) {
      notification.warning({
        message: "Vui lòng chọn ít nhất một thành viên để tách hộ.",
      });
      return;
    }

    const members = householdMembers.map((member) => ({
      id: member.id,
      relationship: relationshipInfo[member.id] || "",
      split: selectedMembers.includes(member.id),
    }));

    const data = {
      members: members,
      household: {
        ...newHouseholdInfo,
        date_of_registration: moment(newHouseholdInfo.date_of_registration).format(
          "YY-MM-DD"
        ),
      },
    };

    // Thực hiện tách hộ và truyền dữ liệu về component cha
    onSplit(data);
    setSelectedMembers([]);
    setNewHouseholdInfo({
      house_number: "",
      street: "",
      ward: "",
      district: "",
      date_of_registration: null,
    });
    setRelationshipInfo({});
  };

  const handleRelationshipChange = (memberId, value) => {
    setRelationshipInfo((prevInfo) => ({
      ...prevInfo,
      [memberId]: value,
    }));
  };

  return (
    <Modal
      title="Tách hộ khẩu"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="split"
          className="bg-blue-500"
          type="primary"
          onClick={handleSplit}
          disabled={selectedMembers.length === 0}
        >
          Đồng ý tách hộ
        </Button>,
      ]}
    >
      <h3>Danh sách thành viên hiện tại của hộ:</h3>
      <Form>
        {householdMembers?.map((member) => (
          <Form.Item key={member.id}>
            <Radio
              value={member.id}
              checked={selectedMembers.includes(member.id)}
              onChange={() => handleMemberChange(member.id)}
            >
              {member.full_name}
            </Radio>
            <Input
              value={relationshipInfo[member.id]}
              onChange={(e) => handleRelationshipChange(member.id, e.target.value)}
              placeholder="Mối quan hệ với chủ hộ mới"
            />
          </Form.Item>
        ))}
      </Form>
      <h3>Thông tin sổ hộ khẩu mới:</h3>
      <Form
        initialValues={newHouseholdInfo}
        onValuesChange={(changedValues, allValues) => {
          setNewHouseholdInfo(allValues);
        }}
      >
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
      </Form>
    </Modal>
  );
};

export default SplitHouseholdModal;
