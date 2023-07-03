import React, {useEffect, useState} from 'react';
import { Card, Modal, Typography } from 'antd';
import axios from "../../api/axios";
const { Text } = Typography;

const DetailResponseModal = ({ feedbackId, response, visible, onClose }) => {
    const [feedbackDetail, setFeedbackDetail] = useState(null);

    useEffect(() => {
        const fetchFeedBackDetail = async () => {
            try{
                const res = await axios.get(`/feedbacks/${feedbackId}`);
                setFeedbackDetail(res.data);
            } catch(error){
                console.log(error);
            }
        };
        if (visible && feedbackId) {
            fetchFeedBackDetail();
        }
    }, [visible, feedbackId]);

  return (
    <Modal
      title="Thông tin phản hồi"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {response && (
        <Card>
          <div className="mb-4">
            <Text strong>Người phản hồi: </Text>
            <Text>{response.responder}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Nội dung phản hồi </Text>
            <Text>{response.response_content}</Text>
          </div>
          <div className="mb-8">
            <Text strong>Ngày phản hồi: </Text>
            <Text>{response.response_date}</Text>
          </div>

          <div className="mb-4">
            <Text strong>Thông tin ý kiến/phản ánh</Text>
          </div>
          
          <div className="mb-4">
            <Text strong>Họ tên: </Text>
            <Text>{feedbackDetail?.submitter}</Text>
          </div>

          <div className="mb-4">
            <Text strong>Số điện thoại: </Text>
            <Text>{feedbackDetail?.phone_number}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Địa chỉ: </Text>
            <Text>{feedbackDetail?.address}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Ngày gửi: </Text>
            <Text>{feedbackDetail?.date_submitted}</Text>
          </div>
          <div className="mb-4">
            <Text strong>Nội dung: </Text>
            <Text>{feedbackDetail?.content}</Text>
          </div>
          </Card>
      )}
    </Modal>
  );
};

export default DetailResponseModal;
