import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";
<<<<<<<< HEAD:front-end/src/components/resident/ResidentTable.js
import {
  Button,
} from "antd";
import Navbar from "../navbar";
import HouseholdTable from "../home/HouseholdTable";
========
import { Button } from "antd";
import Navbar from "../../components/navbar";
>>>>>>>> f4a45611253f60b37ef5e1a2cdf138f85deaa63d:front-end/src/pages/resident/resident.js
import { useNavigate } from "react-router-dom";
import ResidentTable from "../../components/resident/ResidentTable";
const Resident = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/residents"); // Thay đổi đường dẫn API tương ứng
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Danh sách nhân khẩu</h1>
          <Button
            className="bg-blue-500"
            type="primary"
            onClick={() => navigate("/residents/create")}
          >
            Tạo mới nhân khẩu
          </Button>
        </div>
        <ResidentTable data={data} fetchData={fetchData} />
      </div>
    </>
  );
};

export default Resident;
