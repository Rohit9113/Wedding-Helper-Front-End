import React from 'react';
// import Admin_Bar from '../Admin_Bar.jsx';
import Income_Graph from './Income_Graph.jsx';
import TotalCount from './TotalCount.jsx';
import Notifications from './Notifications.jsx';

function Dashboard() {
    return (
        <div className="flex">
            {/* Sidebar */}
            {/* <div className="flex-shrink-0">
                <Admin_Bar />
            </div> */}

            <div className=' px-10 py-5 space-y-5'>
                <TotalCount />

                <div className='flex gap-20'>
                    <Income_Graph />
                    <Notifications />
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
