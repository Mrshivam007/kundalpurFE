import React, { useState } from 'react';
import f1 from '../../../../assets/f5.png';
import './ST.css';
import PurchaseEntry from './Suppliers/PurchaseEntry';
import PurchaseIssue from './Suppliers/PurchaseIssue';

const InvoiceSubTab = () => {
    const [activeSubtab, setActiveSubtab] = useState('subtab1');

    const renderSubtab = () => {
        switch (activeSubtab) {
            case 'subtab1':
                return <PurchaseEntry />;
            case 'subtab2':
                return <PurchaseIssue />;
            default:
                return null;
        }
    };

    return (
        <div className="mobilewidth dashboarmain">
            <div className="container1">
                <div className="bloc-tabs1" style={{ display: 'flex', justifyContent: 'flex-start',marginTop:'-3em' }}>
                    <button
                        className={activeSubtab === 'subtab1' ? 'tabs2' : 'tabs1'}
                        onClick={() => setActiveSubtab('subtab1')}
                        id="suppliers"
                    >
                        <img style={{ marginRight: '4%', width: '20px' }} src={f1} alt="fast" />
                        Purchase Entry Report
                    </button>
                    <button
                        className={activeSubtab === 'subtab2' ? 'tabs2' : 'tabs1'}
                        onClick={() => setActiveSubtab('subtab2')}
                        id="item"
                    >
                        <img style={{ marginRight: '4%', width: '20px' }} src={f1} alt="fast" />
                        Purchase Issue Reports
                    </button>
                </div>
            </div>
            {renderSubtab()}
        </div>
    );
};

export default InvoiceSubTab;
