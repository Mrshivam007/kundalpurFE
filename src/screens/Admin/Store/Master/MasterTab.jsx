import React, { useEffect, useState } from 'react';
import f1 from '../../../../assets/f5.png';
import Items from './Items/Items';
import Suppliers from './Supplers/Suppliers';
import Departments from './Department/Departments';
// import UOM from '../../masters/StoreMasters/UOM/UOM'
import UOM from './UOM/UOM'

const MasterTab = () => {
    const [activeSubtab, setActiveSubtab] = useState('subtab1');

    const renderSubtab = () => {
        switch (activeSubtab) {
            case 'subtab1':
                return <Suppliers />;
            case 'subtab2':
                return <Departments />;
            case 'subtab3':
                return <Items />;
            case 'subtab4':
                return <UOM />
            default:
                return null;
        }
    };

    return (
        <div className="mobilewidth dashboarmain">
            <div className="container1">
                <div className="bloc-tabs1" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-3em' }}>
                    <button
                        className={activeSubtab === 'subtab1' ? 'tabs2' : 'tabs1'}
                        onClick={() => setActiveSubtab('subtab1')}
                        id="suppliers"
                    >
                        <img style={{ marginRight: '4%', width: '20px' }} src={f1} alt="fast" />
                        Suppliers
                    </button>
                    <button
                        className={activeSubtab === 'subtab2' ? 'tabs2' : 'tabs1'}
                        onClick={() => setActiveSubtab('subtab2')}
                        id="item"
                    >
                        <img style={{ marginRight: '4%', width: '20px' }} src={f1} alt="fast" />
                        Departments
                    </button>
                    <button
                        className={activeSubtab === 'subtab3' ? 'tabs2' : 'tabs1'}
                        onClick={() => setActiveSubtab('subtab3')}
                        id="department"
                    >
                        <img style={{ marginRight: '4%', width: '20px' }} src={f1} alt="fast" />
                        Items
                    </button>
                    <button
                        className={activeSubtab === 'subtab4' ? 'tabs2' : 'tabs1'}
                        onClick={() => setActiveSubtab('subtab4')}
                        id="department"
                    >
                        <img style={{ marginRight: '4%', width: '20px' }} src={f1} alt="fast" />
                        UOM
                    </button>
                </div>
            </div>
            {renderSubtab()}
        </div>
    );
};

export default MasterTab;
