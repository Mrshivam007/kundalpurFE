import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Allcheckout.css';
function Allforcecheckout({ data, bookingid }) {
  const navigation = useNavigate();
  const [isdata, setisData] = useState('');
  useEffect(() => {
    let particularData = data?.filter((item) => {
      return item?.booking_id === bookingid;
    });
    setisData(particularData);

    console.log(bookingid, data);
  }, []);

  const handlesubmit = async () => {
    navigation('/admin-panel/Allforcecheckout', {
      state: {
        checkoutdata: isdata,
      },
    });
  };
  return (
    <>
      <div>
        <p>
          Dharamshala Name :- &nbsp;<spna>{data[0]?.dharmasala?.name}</spna>
        </p>
        <p>Room List</p>
        {isdata &&
          isdata.map((item) => {
            return <p>{item?.RoomNo},</p>;
          })}
      </div>
      <button className="chaneRoom" onClick={() => handlesubmit()}>
        All Force Checkout
      </button>
    </>
  );
}

export default Allforcecheckout;
