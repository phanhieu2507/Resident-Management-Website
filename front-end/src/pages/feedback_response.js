import React from 'react'
import FeedbackResponseTable from '../components/feedback_response/FeedbackResponseTable'
const FeedbackResponse = () => {
  return (
    <>
    <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách phản hồi</h1>
        </div>
        <FeedbackResponseTable />
      </div>

    </>
  )
}

export default FeedbackResponse
