import React from 'react';
import { useState, useEffect } from "react";
import './HomePage.css';
import HomeTab from './HomeTab';
import ApplicationTab from './ApplicationTab';
import ServiceRequestTab from './ServiceRequestTab';

//  ------------------------------------------------ JS  ------------------------------------------------
function HomePage() {
    // ------------------------------------------------Variable Declaration Starts here---------------------------------------------------
    const [activeTab, setActiveTab] = useState('Home');
    const [onApplicationTab, setApplicationTab] = useState(false);

    useEffect(() => {
        setActiveTab('Home');
    }, []);

    function onNavigationClick(event, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tabbutton");

        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block"; 
        event.currentTarget.className += " active";
        if(tabName === 'Application'){
            setApplicationTab(true);
        }
    }

    //  ------------------------------------------------ HTML  ------------------------------------------------
    return(
        <>
            <div className="PageHeader">
                <div className='HeaderMain'>
                    SIVIO Community
                </div>
                <div className="GlobalNavigation">
                    <div className="tab">
                        <button className="tabbutton" onClick={(event) => onNavigationClick(event, "Home")}>Home</button>
                        <button className="tabbutton" onClick={(event) => onNavigationClick(event, "Application")}>Application</button>
                        <button className="tabbutton" onClick={(event) => onNavigationClick(event, "ServiceRequest")}>Service Request</button>

                        {/* <button className="tabbutton" onClick={(event) => onNavigationClick(event, "Groups")}>Groups</button>
                        <button className="tabbutton" onClick={(event) => onNavigationClick(event, "myReq")}>My Requests</button> */}
                    </div>
                </div>
            </div>
            <div className="PageBody">
                <div id="Home" className={`tabContent ${activeTab === 'Home' ? 'active' : ''}`}>
                    <HomeTab/>
                </div>
                <div id="Application" className={`tabContent ${activeTab === 'Application' ? 'active' : ''}`}>
                    {onApplicationTab && (
                        <ApplicationTab/>
                    )}
                </div>
                <div id="ServiceRequest" className={`tabContent ${activeTab === 'ServiceRequest' ? 'active' : ''}`}>
                    <ServiceRequestTab/>
                </div>
            </div>
        </>
    );
}

export default HomePage;
