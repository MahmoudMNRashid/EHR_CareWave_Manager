import React, { useState, useEffect } from 'react';
import { getToken } from '../../Util/Auth';
import { ToastContainer, toast } from 'react-toastify';
import { DoctorCard } from '../../components/Manager/AllAboutDr_Function/DoctorCard';
import { DrSearchForm } from '../../components/Manager/AllAboutDr_Function/DrSearchForm';
import nothing from '../../style/nothing (1).png';
import { Helmet } from 'react-helmet';

export const DoctorsSearchName = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    setFilteredData(doctorsData);
  }, [doctorsData]);

  const fetchAllDoctorByName = async (name) => {
    try {
      const response = await fetch(`http://localhost:8000/v1/User/get-doctors/byname/${name}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getToken()}`
        },
      });

      if (!response.ok) {
        throw new Error('شيء ما حدث');
      }

      const data = await response.json();
      const editData = data.data.result;

      for (let i = 0; i < editData.length; i++) {
        editData[i].name = name;
      }

      setDoctorsData(editData);
    } catch (error) {
      toast.error('!حدث خطأ ما', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleFilter = (state) => {
    if (state === 'الكل') {
      setFilteredData(doctorsData);
      setSelectedState('');
    } else {
      const filtered = doctorsData.filter(item => item.governorate === state);
      setFilteredData(filtered);
      setSelectedState(state);
    }
  };

  return (
    <>
            <Helmet><title>البحث عن طبيب عن طريق الأسم</title></Helmet>

      <DrSearchForm api={fetchAllDoctorByName} name={'اسم الطبيب'} />
     <div style={{ display:'flex',alignItems:'center',justifyContent:'center' ,marginTop:'10px',gap:'10px'}}>
     { doctorsData.length > 0 &&<p> النتائج حسب المحافظة</p>}
      {doctorsData.length > 0 &&(<div className="relative flex justify-cente">
        <svg
        style={{top:'-7px'}}
          className={`w-2 h-2 absolute  right-0 m-4 pointer-events-none`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fillRule="nonzero"
          />
        </svg>
        <select
          className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          value={selectedState}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value=""> اختر المحافظة  </option>
          <option value="الكل">الكل</option>
          <option value="Damascus">دمشق</option>
          <option value="ريف دمشق">ريف دمشق</option>
          <option value="القنيطرة">القنيطرة</option>
          <option value="درعا">درعا</option>
          <option value="السويداء">السويداء</option>
          <option value="حمص">حمص</option>
          <option value="طرطوس">طرطوس</option>
          <option value="اللاذقية">اللاذقية</option>
          <option value="حماة">حماة</option>
          <option value="إدلب">إدلب</option>
          <option value="حلب">حلب</option>
          <option value="الرقة">الرقة</option>
          <option value="دير الزور">دير الزور</option>
          <option value="الحسكة">الحسكة</option>
        </select>
      </div>)}
     </div>
      <div className="divflex">
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            return <DoctorCard key={item.id} data={item} />;
          })
        ) : (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
            <h4 style={{ color: '#151726', fontWeight: 600, fontSize: '25px' }}>لا يوجد نتائج</h4>
            <img style={{ width: '30px', color: 'black' }} src={nothing} alt="error" />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};
