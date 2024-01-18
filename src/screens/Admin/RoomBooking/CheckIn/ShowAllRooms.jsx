import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API//ServerInstance';
import RoomShiftForm from '../RoomShift/RoomShiftForm';
function ShowAllRooms({ changedata, setOpen }) {
  const [isddata, setisddata] = useState('');
  const [changeda, setchangeda] = useState('');
  const [showroomshift, setshowroomshift] = useState(false);


  useEffect(() => {
    serverInstance(
      `room/roomsByBookingId?booking_id=${changedata?.booking_id}`,
      'get',
    ).then((res) => {
      console.log('from get rooms del', res?.data);
      if (res?.data) {
        setisddata(res?.data);
      }
    });
  }, []);

  return (
    <>
      {showroomshift === false && (
        <>
          <table>
            <thead>
              <tr
                className="margintop_add"
                style={{ borderBottom: '1px solid gray' }}
              >
                <th>S.No</th>
                <th>B_Id</th>
                <th>Mobile</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Dharamshala</th>
                <th>RoomNo</th>
                <th>Rent</th>
                <th>Advance</th>
                <th>Employee</th>
                <th>PayMode</th>
                <th>Action</th>
              </tr>
            </thead>
            {isddata &&
              isddata?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="margintop_add"
                    style={{ borderBottom: '1px solid gray' }}
                  >
                    <td>{index + 1}</td>
                    <td>{item?.booking_id}</td>
                    <td>{item?.contactNo}</td>
                    <td>{item?.name}</td>
                    <td>{item?.address}</td>
                    <td>{item?.dharmasala?.name}</td>
                    <td>{item?.RoomNo}</td>
                    <td>{item?.roomAmount}.00</td>
                    <td>{item?.advanceAmount}.00</td>
                    <td>{item?.bookedByName}</td>
                    <td>{item?.paymentMode === 2 ? 'Cash' : 'Online'}</td>
                    <td>
                      <input
                        type="radio"
                        name="same"
                        onClick={() => setchangeda(item)}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
          <div className="save-div-btn">
            <button
              style={{ marginRight: '2rem' }}
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => setshowroomshift(true)}
              className="save-div-btn-btn"
            >
              Next
            </button>
          </div>
        </>
      )}

      {showroomshift && (
        <>
          <RoomShiftForm setOpen={setOpen} changedata={changeda} />
        </>
      )}
    </>
  );
}

export default ShowAllRooms;
