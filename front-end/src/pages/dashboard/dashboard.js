import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Navbar from "../../components/navbar";
const Dashboard = () => {
  const householdOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Tỉ lệ thường trú và tạm trú",
    },
    series: [
      {
        name: "Số hộ",
        data: [
          {
            name: "Thường trú",
            y: 80,
          },
          {
            name: "Tạm trú",
            y: 20,
          },
        ],
      },
    ],
  };

  const ageOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Tỉ lệ theo độ tuổi",
    },
    series: [
      {
        name: "Tỉ lệ",
        data: [
          {
            name: "Dưới 18 tuổi",
            y: 25,
          },
          {
            name: "18 - 30 tuổi",
            y: 35,
          },
          {
            name: "31 - 50 tuổi",
            y: 30,
          },
          {
            name: "Trên 50 tuổi",
            y: 10,
          },
        ],
      },
    ],
  };

  const genderOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Tỉ lệ nam nữ",
    },
    series: [
      {
        name: "Tỉ lệ",
        data: [
          {
            name: "Nam",
            y: 55,
          },
          {
            name: "Nữ",
            y: 45,
          },
        ],
      },
    ],
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Thống kê</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 p-4 text-white rounded-md">
          <h3 className="text-lg font-semibold mb-2">Số hộ</h3>
          <p className="text-2xl font-bold">100</p>
        </div>

        <div className="bg-green-500 p-4 text-white rounded-md">
          <h3 className="text-lg font-semibold mb-2">Số nhân khẩu</h3>
          <p className="text-2xl font-bold">300</p>
        </div>

        <div className="bg-yellow-500 p-4 text-white rounded-md">
          <h3 className="text-lg font-semibold mb-2">Số phản ánh</h3>
          <p className="text-2xl font-bold">50</p>
        </div>

        <div className="bg-purple-500 p-4 text-white rounded-md">
          <h3 className="text-lg font-semibold mb-2">Đã phản hồi</h3>
          <p className="text-2xl font-bold">30</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Tỉ lệ thường trú và tạm trú</h3>
        <HighchartsReact highcharts={Highcharts} options={householdOptions} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Tỉ lệ theo độ tuổi</h3>
        <HighchartsReact highcharts={Highcharts} options={ageOptions} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Tỉ lệ nam nữ</h3>
        <HighchartsReact highcharts={Highcharts} options={genderOptions} />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
