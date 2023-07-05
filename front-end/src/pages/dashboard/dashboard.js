import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Navbar from "../../components/navbar";
import axios from '../../api/axios';
const Dashboard = () => {
  const [householdCount, setHouseholdCount] = useState(0);
  const [residentCount, setResidentCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [thuongtruCount, setThuongtruCount] = useState(0);
  const [tamtruCount, setTamtruCount] = useState(0);
  const [ageData, setAgeData] = useState({
    'Dưới 18 tuổi': 0,
    '18 - 30 tuổi': 0,
    '31 - 50 tuổi': 0,
    'Trên 50 tuổi': 0,
  });

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const fetchData = async() => {
    try {
      const householdResponse = await axios.get("/households");
      const residentResponse = await axios.get("/residents");
      const feedbackResponse = await axios.get("/feedbacks");
      const responseResponse = await axios.get("/feedback_responses");

      setHouseholdCount(householdResponse.data.length);
      setResidentCount(residentResponse.data.length);
      setFeedbackCount(feedbackResponse.data.length);
      setResponseCount(responseResponse.data.length);

      const residents = residentResponse.data;
      const male = residents.filter((resident) => resident.gender === "Nam");
      const female = residents.filter((resident) => resident.gender === "Nữ");
      
      setMaleCount(male.length);
      setFemaleCount(female.length);

      const updatedAgeData = {
        'Dưới 18 tuổi': 0,
        '18 - 30 tuổi': 0,
        '31 - 50 tuổi': 0,
        'Trên 50 tuổi': 0,
      };

      residents.forEach((resident) => {
        const age = calculateAge(resident.date_of_birth);

        if (age < 18) {
          updatedAgeData['Dưới 18 tuổi'] += 1;
        } else if (age >= 18 && age <= 30) {
          updatedAgeData['18 - 30 tuổi'] += 1;
        } else if (age > 30 && age <= 50) {
          updatedAgeData['31 - 50 tuổi'] += 1;
        } else {
          updatedAgeData['Trên 50 tuổi'] += 1;
        }
      });

      setAgeData(updatedAgeData);
      
      const thuongtru = residents.filter((resident) => resident.status === "Thường trú");
      const tamtru = residents.filter((resident) => resident.status === "Tạm trú");

      setThuongtruCount(thuongtru.length);
      setTamtruCount(tamtru.length);
      

    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const householdOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Tỉ lệ thường trú và tạm trú",
    },
    series: [
      {
        name: "Tỉ lệ",
        data: [
          {
            name: "Thường trú",
            y: thuongtruCount,
          },
          {
            name: "Tạm trú",
            y: tamtruCount,
          },
        ],
      },
    ],
  };

  const ageOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Tỉ lệ theo độ tuổi',
    },
    series: [
      {
        name: 'Tỉ lệ',
        data: Object.entries(ageData).map(([ageRange, count]) => ({
          name: ageRange,
          y: count,
        })),
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
            y: maleCount,
          },
          {
            name: "Nữ",
            y: femaleCount,
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
          <p className="text-2xl font-bold">{householdCount}</p>
        </div>

        <div className="bg-green-500 p-4 text-white rounded-md">
          <h3 className="text-lg font-semibold mb-2">Số nhân khẩu</h3>
          <p className="text-2xl font-bold">{residentCount}</p>
        </div>

        <div className="bg-yellow-500 p-4 text-white rounded-md">
          <h3 className="text-lg font-semibold mb-2">Số phản ánh</h3>
          <p className="text-2xl font-bold">{feedbackCount}</p>
        </div>

        <div className="bg-purple-500 p-4 text-white rounded-md">
          <h3 className="text-lg font-semibold mb-2">Đã phản hồi</h3>
          <p className="text-2xl font-bold">{responseCount}</p>
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
