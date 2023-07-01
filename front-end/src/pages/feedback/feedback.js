import React from 'react';
import Navbar from '../../components/navbar';
import FeedbackTable from '../../components/feedback/FeedbackTable';
import CreateFeedbackPage from '../../components/feedback/CreateFeedbackModal';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Feedback = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách ý kiến/phản ánh</h1>
          <Button className="bg-blue-500" type="primary">
            <Link to="/create_feedback">Tạo ý kiến/phản ánh mới</Link>
          </Button>
        </div>
        <FeedbackTable />
      </div>
    </>
  );
};

export default Feedback;
