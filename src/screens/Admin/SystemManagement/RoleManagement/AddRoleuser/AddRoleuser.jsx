import React, { useEffect, useState } from 'react';
import './AddRoleuser.css';

const AddRoleuser = ({ setOpen }) => {
  const [donationtype, setdonationtype] = useState('');

  return (
    <>
      <div className="cash-donation-div">
        <div className="table_scrol_barrr1">
          <div className="cash-donation-container-innser1">
            <div className="form-div1">
              <div className="form-input-div2">
                <div className="inner-input-div22">
                  <label>Role Name </label>
                  <input
                    style={{ width: '100%' }}
                    type="text"
                    className="forminput-role"
                    // value={currentDate}

                    // name="todaydate"
                    // onChange={(e) => settodaydate(e.target.value)}
                  />
                </div>
                <div className="inner-input-div22">
                  <label>Role Description</label>
                  <input
                    style={{ width: '100%' }}
                    text="text"
                    className="forminput-role"
                    // placeholder="Enter phone no"
                  />
                </div>
              </div>

              <table class="styled-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Add</th>
                    <th style={{ textAlign: 'center' }}>Edit</th>
                    <th style={{ textAlign: 'center' }}>Delete</th>
                    <th style={{ textAlign: 'center' }}>Enquire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select
                        style={{ width: '50px' }}
                        className="inner-input-div1-select1"
                        id="type"
                        name="donationtype"
                        value={donationtype}
                        onChange={(e) => setdonationtype(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                    <td>
                      <select
                        style={{ width: '50px' }}
                        className="inner-input-div1-select1"
                        id="type"
                        name="donationtype"
                        value={donationtype}
                        onChange={(e) => setdonationtype(e.target.value)}
                      >
                        <option value="None">None</option>
                        <option value="All">All</option>
                        <option value="Owner">Owner</option>
                      </select>
                    </td>
                    <td>
                      <select
                        style={{ width: '50px' }}
                        className="inner-input-div1-select1"
                        id="type"
                        name="donationtype"
                        value={donationtype}
                        onChange={(e) => setdonationtype(e.target.value)}
                      >
                        <option value="None">None</option>
                        <option value="All">All</option>
                        <option value="Owner">Owner</option>
                      </select>
                    </td>
                    <td>
                      <select
                        style={{ width: '50px' }}
                        className="inner-input-div1-select1"
                        id="type"
                        name="donationtype"
                        value={donationtype}
                        onChange={(e) => setdonationtype(e.target.value)}
                      >
                        <option value="None">None</option>
                        <option value="All">All</option>
                        <option value="Owner">Owner</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="save-div-btn">
              <button className="save-div-btn-btn">Save</button>
              <button
                onClick={() => setOpen(false)}
                className="save-div-btn-btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoleuser;
