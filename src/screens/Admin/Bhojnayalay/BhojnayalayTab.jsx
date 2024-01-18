import React, { useState, useEffect } from 'react';
import f1 from '../../../assets/f4.png';
import { NavLink } from 'react-router-dom';


const BhojnayalayTab = ({ setopendashboard }) => {
    const [role, setrole] = useState('');
    const [emproleid, setemproleid] = useState('');
    useEffect(() => {
        setopendashboard(true);
        setrole(Number(sessionStorage.getItem('userrole')));
        setemproleid(Number(sessionStorage.getItem('empRoleid')));
    }, []);

    return (
        <>
            <div className="mobilewidth dashboarmain">
                <div className="container1">
                    <div className="bloc-tabs1">
                        <NavLink
                            to="/admin-panel/bhojnayalay/todayorders"
                            className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                        >
                            <img
                                style={{ marginRight: '4%', width: '20px' }}
                                src={f1}
                                alt="fast"
                            />
                            Today Orders
                        </NavLink>
                        <NavLink
                            to="/admin-panel/bhojnayalay/futureorders"
                            className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                        >
                            <img
                                style={{ marginRight: '4%', width: '20px' }}
                                src={f1}
                                alt="fast"
                            />
                            Future Orders
                        </NavLink>
                        <NavLink
                            to="/admin-panel/bhojnayalay/history"
                            className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                        >
                            <img
                                style={{ marginRight: '4%', width: '20px' }}
                                src={f1}
                                alt="fast"
                            />
                            Bhojnayalay History
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BhojnayalayTab;
