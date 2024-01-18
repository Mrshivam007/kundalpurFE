import React, { useState, useEffect } from 'react';


import f1 from '../../../../assets/f5.png';
import '../ExpensesMasters/ST.css';
// import ExpenseOrder from './expense_order/ExpenseOrder';


import SupplierName from './SupplierName/SupplierName'
import PaymentType from './PaymentType/PaymentType'
import UOM from './UOM/UOM'
import Item from './Item/Item';


const MasterTap = ({ setopendashboard }) => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    useEffect(() => {
        setopendashboard(true);
    }, []);

    return (
        <>
            <div className="mobilewidth , dashboarmain">
                <div className="container1">
                    <div className="bloc-tabs1" style={{ justifyContent: 'flex-start' }}>

                        <button
                            className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
                            onClick={() => toggleTab(1)}
                        >
                            <img
                                style={{ marginRight: '4%', width: '20px' }}
                                src={f1}
                                alt="fast"
                            />
                            Supplier Name Master
                        </button>

                        <button
                            className={toggleState === 2 ? 'tabs2 ' : 'tabs1'}
                            onClick={() => toggleTab(2)}
                        >
                            <img
                                style={{ marginRight: '4%', width: '20px' }}
                                src={f1}
                                alt="fast"
                            />
                            Payment Type Master
                        </button>

                        <button
                            className={toggleState === 3 ? 'tabs2 ' : 'tabs1'}
                            onClick={() => toggleTab(3)}
                        >
                            <img
                                style={{ marginRight: '4%', width: '20px' }}
                                src={f1}
                                alt="fast"
                            />
                            Unit Of Measurement
                        </button>

                        <button
                            className={toggleState === 4 ? 'tabs2 ' : 'tabs1'}
                            onClick={() => toggleTab(4)}
                        >
                            <img
                                style={{ marginRight: '4%', width: '20px' }}
                                src={f1}
                                alt="fast"
                            />
                            Item Master
                        </button>


                    </div>

                    <div className="content-tabs">
                        <div
                            className={
                                toggleState === 1 ? 'content  active-content' : 'content'
                            }
                        >
                            <SupplierName setopendashboard={setopendashboard} />
                        </div>

                        <div
                            className={
                                toggleState === 2 ? 'content  active-content' : 'content'
                            }
                        >
                            <PaymentType setopendashboard={setopendashboard} />
                        </div>

                        <div
                            className={
                                toggleState === 3 ? 'content  active-content' : 'content'
                            }
                        >
                            <UOM setopendashboard={setopendashboard} />
                        </div>

                        <div
                            className={
                                toggleState === 4 ? 'content  active-content' : 'content'
                            }
                        >
                            <Item setopendashboard={setopendashboard} />
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default MasterTap;
