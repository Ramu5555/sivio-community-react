import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import './ApplicationTab.css';

import PersonalDetails from './PersonalDetails';
import FamilyDetails from './FamilyDetails';
import EmploymentDetails from './EmploymentDetails';
import EducationDetails from './EducationDetails';
import Awards from './Awards';
import Extracurriculars from './Extracurriculars';
import TestScores from './TestScores';
import Recommendations from './Recommendations';
import Resume from './Resume';
import Declaration from './Declaration';

function ApplicationTab() {
    const [data, setData] = useState([]); 
        useEffect(() => { 
        axios.get('http://localhost:5000/api/data')
        .then(response => {
            setData(response.data.records);
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
        }, []);

        const aplliContinue = ()=> {
            console.log('apppp')
            if (document.getElementById('ApplicationTable')) {
                if (document.getElementById('ApplicationTable').style.display === 'none') {
                    document.getElementById('ApplicationTable').style.display = 'block';
                    document.getElementById('editApplication').style.display = 'none';
                }
                else {
                    document.getElementById('ApplicationTable').style.display = 'none';
                    document.getElementById('editApplication').style.display = 'block';
                }
            }
            document.getElementById("defaultOpen").click();
        }
        const openModal = ()=> {

        }
        const appTabClick = (evt, name)=>{
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("vtabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
              }
              tablinks = document.getElementsByClassName("vtablinks");
              for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
              }
              document.getElementById(name).style.display = "block";
              evt.currentTarget.className += ' active'; 
        }
        const backtoAppliactions = ()=>{
            if (document.getElementById('editApplication')) {
                if (document.getElementById('editApplication').style.display === 'none') {
                    document.getElementById('editApplication').style.display = 'block';
                    document.getElementById('ApplicationTable').style.display = 'none';
                }
                else {
                    document.getElementById('editApplication').style.display = 'none';
                    document.getElementById('ApplicationTable').style.display = 'block';
                }
            }
        }
    return(
        <>
           <div className="grid-container">
                <div className="grid-item">

                </div>
                <div className="grid-item">
                    <div style={{fontSize:'20px',fontWeight:'500'}}>Applications</div>
                    <div className='ApplicationTable' id='ApplicationTable'>
                        <table style={{width:'100%',paddingTop:'10px'}}>
                            <thead>
                                <tr>
                                    <th style={{width:'25%',textAlign:'left'}}>Name</th>
                                    <th style={{width:'25%',textAlign:'left'}}>Course Name</th>
                                    <th style={{width:'25%',textAlign:'left'}}>Community Status</th>
                                    <th style={{width:'25%',textAlign:'left'}}></th>
                                </tr>
                            </thead>
                            <tbody>  
                            {data.map((contact) => (
                                <tr key={contact.Id}>
                                    <td>{contact.Name}</td>
                                    <td>.............</td>
                                    <td>{contact.Status__c}</td>
                                    <td><button type='submit' className='buttonStyle' onClick={aplliContinue} style={{marginLeft:'10px'}}>Continue</button></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <button style={{marginTop:'10px'}} type='submit' className='buttonStyle' onClick={openModal}><i class="fa fa-plus"></i> Add New</button>
                    </div>
                    <div id='editApplication'>
                        <div className="vtab">
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "AppHome")} id="defaultOpen">Home</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Personal")}>Personal</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "FamilyDetails")}>Family Details</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Employment")}>Employment</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Education")}>Education</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Awards")}>Awards</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Extracurriculars")}>Extracurriculars</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "TestScores")}>Test Scores</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Recommendations")}>Recommendations</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Resume")}>Resume</button>
                            <button className="vtablinks" onClick={(event) => appTabClick(event, "Declaration")}>Declaration</button>
                        </div>
                        <div><button className='buttonStyle' style={{float:'right'}} onClick={backtoAppliactions}>Back to Applications</button></div>
                        <div id="AppHome" className="vtabcontent">
                            <div style={{fontSize:'1.125rem',marginTop:'200px'}}>
                                Welcome to our portal! Please take the next step by clicking the "Continue" button to provide the remaining details and complete your application. We are excited to review your finished application as you get one step closer to realizing your aspirations."
                            </div>
                        </div>
                        <div id="Personal" className="vtabcontent">
                            <PersonalDetails/>
                        </div>
                        <div id="FamilyDetails" className="vtabcontent">
                            <FamilyDetails/>
                        </div>
                        <div id="Employment" className="vtabcontent">
                            <EmploymentDetails/>
                        </div>
                        <div id="Education" className="vtabcontent">
                            <EducationDetails/>
                        </div>
                        <div id="Awards" className="vtabcontent">
                            <Awards/>
                        </div>
                        <div id="Extracurriculars" className="vtabcontent">
                            <Extracurriculars/>
                        </div>
                        <div id="TestScores" className="vtabcontent">
                            <TestScores/>
                        </div>
                        <div id="Recommendations" className="vtabcontent">
                            <Recommendations/>
                        </div>
                        <div id="Resume" className="vtabcontent">
                            <Resume/>
                        </div>
                        <div id="Declaration" className="vtabcontent">
                            <Declaration/>
                        </div>
                    </div>
                </div>
                <div className="grid-item">

                </div>
            </div>
        </>
    );
}

export default ApplicationTab;