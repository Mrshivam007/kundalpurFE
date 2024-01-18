import React, { useState } from 'react';
import f1 from '../../../../assets/f5.png';

import Items from './Items/Items';
import Suppliers from './Suppliers/Suppliers';

const InventorySubTab = () => {
    const [activeSubtab, setActiveSubtab] = useState('subtab1');

    const renderSubtab = () => {
        switch (activeSubtab) {
            case 'subtab1':
                return <Suppliers />;
            case 'subtab2':
                return <Items />;
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
                        Items
                    </button>
                </div>
            </div>
            {renderSubtab()}
        </div>
    );
};

export default InventorySubTab;
