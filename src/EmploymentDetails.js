import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import './EmploymentDetails.css';
import { FadeLoader  } from 'react-spinners';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


   
function EmploymentDetails(){
   

    const pythonDomain = 'http://localhost:5000/';

    const [employmentList, setemploymentList] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [countryOptions, setcountryOptions] = useState(useState(new Map()));
    const [industryOptions, setindustryOptions] = useState(useState(new Map())); 
    const [jobFunctionOptions, setJobFunctionOptions] = useState(useState(new Map()));

    const[empId, setEmpId] = useState();
    const[organisationName,setOrganisationName] = useState();
    const[city,setCity] = useState();
    const[state,setState] = useState();
    const[country,setCountry] = useState();
    const[employmentStartDate,setEmploymentStartDate] = useState();
    const[employmentEndDate,setEmploymentEndDate] = useState();
    const[telephone,setTelephone] = useState();
    const[salary,setSalary] = useState();
    const[startingPosition,setStartingPosition] = useState();
    const[currentPosition,setCurrentPosition] = useState();
    const[annualBaseSC,setAnnualBaseSC] = useState();
    const[annualBonusSC,setAnnualBonusSC] = useState();
    const[annualBaseEC,setAnnualBaseEC] = useState();
    const[annualBonusEC,setAnnualBonusEC] = useState();
    const[industry,setIndustry] = useState();
    const[jobFunction,setJobFunction] = useState();
    const[website,setWebsite] = useState();
    const[roleAndResponsibilities,setRoleAndResponsibilities] = useState();
    const[company,setCompany] = useState();
    const[reasonForLeaving,setReasonForLeaving] = useState();
    const[keyAccomplishments,setKeyAccomplishments] = useState();
    const[mostSignificantChallenges,setMostSignificantChallenges] = useState();


    useEffect(() => {
        // if(employmentList === undefined){
            axios.post(`${pythonDomain}employmentDetails`)
            .then(response => {
                setemploymentList(response.data);
                console.log('EmploymentDetails:: ',response.data)
            }) 
            .catch(error => { 
                console.error('EmploymentDetails Error fetching data:', error); 
            });
        //}
    }, []);

    
    const addNewEmployment = () =>{

        setLoading(true)
        axios.post(`${pythonDomain}employmentPickLists`)
        .then(response => {
            const noneOption = { id: null, name: '--None--' };
            const countryOptions = [noneOption, ...Object.entries(response.data.countryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const industryOptions = [noneOption, ...Object.entries(response.data.industryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const jobFunctionOptions = [noneOption, ...Object.entries(response.data.jobFunctionPickList).map(([key, value]) => ({ id: key, name: value }))];
           
            setcountryOptions(countryOptions);
            setindustryOptions(industryOptions);
            setJobFunctionOptions(jobFunctionOptions);
            
            if(countryOptions !== undefined && industryOptions !==undefined && jobFunctionOptions !== undefined){
                setLoading(false)
                setModal(true)
            }
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    }
    
    
    const updateEmployment = (empId) =>{
        console.log('Delete employment Record: ',empId);
        setLoading(true);
        setModal(true);
        axios.post(`${pythonDomain}updateEmploymentRecord?empRecordId=${empId}`)
        .then(response => {
            console.log(response.data);
            setLoading(false);
            let empRec = response.data.employmentRecord;

            setEmpId(empRec.Id)
            setOrganisationName(empRec.Name)
            setCity(empRec.City__c)
            setState(empRec.State__c)
            setCountry(empRec.Country__c)
            setEmploymentStartDate(empRec.Employment_Start_Date__c)
            setEmploymentEndDate(empRec.Employment_End_Date__c)
            setTelephone(empRec.TelePhone__c)
            setSalary(empRec.Salary__c)
            setStartingPosition(empRec.Starting_Position__c)
            setCurrentPosition(empRec.Designation__c)
            setAnnualBaseSC(empRec.Starting_Compensation_Annual_Base__c)
            setAnnualBonusSC(empRec.Starting_Compensation_Annual_Bonus__c)
            setAnnualBaseEC(empRec.Ending_Compensation_Annual_Base__c)
            setAnnualBonusEC(empRec.Ending_Compensation_Annual_Base__c)
            setIndustry(empRec.Industry__c)
            setJobFunction(empRec.Job_Function__c)
            setWebsite(empRec.Website__c)
            setRoleAndResponsibilities(empRec.Your_Role_and_Responsibilities__c)
            setCompany(empRec.Company_Organization_Description__c)
            setReasonForLeaving(empRec.Reason_For_Leaving__c)
            setKeyAccomplishments(empRec.key_Accomplishments__c)
            setMostSignificantChallenges(empRec.Most_Significant_Challenges__c)

            const noneOption = { id: null, name: '--None--' };
            const countryOptions = [noneOption, ...Object.entries(response.data.countryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const industryOptions = [noneOption, ...Object.entries(response.data.industryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const jobFunctionOptions = [noneOption, ...Object.entries(response.data.jobFunctionPickList).map(([key, value]) => ({ id: key, name: value }))];
           
            setcountryOptions(countryOptions);
            setindustryOptions(industryOptions);
            setJobFunctionOptions(jobFunctionOptions);

        }) 
        .catch(error => { 
            console.error('FamilyDetails Error fetching data:', error); 
        });
    }
    const deleteEmpoyment = (empId) =>{
        setLoading(true);
        console.log('Delete employment Record: ',empId);
        axios.post(`${pythonDomain}deleteEmploymentRecord?employmentRecordId=${empId}`)
            .then(response => {
                console.log('Family DElete Response:: ',response.data)
                if(response.data === 'Employment Record Successfully Deleted'){
                    toast.success(response.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      axios.post(`${pythonDomain}employmentDetails`)
                        .then(response => {
                            setemploymentList(response.data);
                            console.log('EmploymentDetails:: ',response.data)
                            setLoading(false);
                        }) 
                        .catch(error => { 
                            console.error('EmploymentDetails Error fetching data:', error); 
                        });
                }else{
                    toast.error(response.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                }
            }) 
            .catch(error => { 
                console.error('FamilyDetails Error fetching data:', error); 
            });
    }
    const onSave =() =>{

        const employmentRecordData = {id:empId, organisationName:organisationName,city:city,state:state,country:country,employmentStartDate:employmentStartDate,
        employmentEndDate:employmentEndDate,telephone:telephone,salary:salary,startingPosition:startingPosition,currentPosition:currentPosition,
        annualBaseSC:annualBaseSC,annualBonusSC:annualBonusSC,annualBaseEC:annualBaseEC,annualBonusEC:annualBonusEC,industry:industry,jobFunction:jobFunction,
        website:website,roleAndResponsibilities:roleAndResponsibilities,company:company,reasonForLeaving:reasonForLeaving,keyAccomplishments:keyAccomplishments,
        mostSignificantChallenges:mostSignificantChallenges}

        console.log('employmentRecordData:: ',JSON.stringify(employmentRecordData))   
        
        axios.post(`${pythonDomain}newEmploymentRecord?employmentRecord=${JSON.stringify(employmentRecordData)}`)
        .then(response => {
            console.log('employmentData:: ',response.data)
            if(response.data === 'Success'){
                toast.success(response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                axios.post(`${pythonDomain}employmentDetails`)
                .then(response => {
                    setemploymentList(response.data);
                    console.log('EmploymentDetails:: ',response.data)
                }) 
                .catch(error => { 
                    console.error('EmploymentDetails Error fetching data:', error); 
                });
                setModal(false);
                setOrganisationName('');
                setCity('');
                setState('');
                setCountry('');
                setEmploymentStartDate('');
                setEmploymentEndDate('');
                setTelephone('');
                setSalary('');
                setStartingPosition('');
                setCurrentPosition('');
                setAnnualBaseSC('');
                setAnnualBonusSC('');
                setAnnualBaseEC('');
                setAnnualBonusEC('');
                setIndustry('');
                setJobFunction();
                setWebsite();
                setRoleAndResponsibilities();
                setCompany();
                setReasonForLeaving();
                setKeyAccomplishments();
                setMostSignificantChallenges();
            }else{
                toast.error(response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
            }
            
        }) 
        .catch(error => { 
            console.error('EmployeeData Error fetching data:', error); 
        }); 

    }
    const onModalClose =() =>{
        setModal(false);
        setOrganisationName('');
        setCity('');
        setState('');
        setCountry('');
        setEmploymentStartDate('');
        setEmploymentEndDate('');
        setTelephone('');
        setSalary('');
        setStartingPosition('');
        setCurrentPosition('');
        setAnnualBaseSC('');
        setAnnualBonusSC('');
        setAnnualBaseEC('');
        setAnnualBonusEC('');
        setIndustry('');
        setJobFunction('');
        setWebsite('');
        setRoleAndResponsibilities('');
        setCompany('');
        setReasonForLeaving('');
        setKeyAccomplishments('');
        setMostSignificantChallenges('');
    }

       
           

    return (
        <div>
            <div className='PageTitle'>Employment Details</div>
                {loading && (
                    <div className="spinner-container">
                        <FadeLoader  color={'#000000'} loading={loading} size={100} />
                    </div>
                )}
            
            <div className='expDiv'>
                <label>Months of full-time work experience</label>
                <input type="exp"  name="exp" className='expInp'></input>
            </div>

            <div className='gapTADiv'>
                <label>Please provide an explanation for any gaps in your employment history.</label>
                <textarea name="employmentGaps" rows="4" cols="50"></textarea >
            </div>

            <div>
                <p>Please input details of each of your past job descriptions below. (Starting with the latest first).</p>
            </div>

            <div className='FamilyTable'>
                <table style={{width:'100%',paddingTop:'10px'}}>
                <thead>
                 <tr>
                    <th style={{ width: '25%', textAlign: 'left' }}>Organisation Name</th>
                    <th style={{ width: '10%', textAlign: 'left' }}>Designation</th>
                    <th style={{ width: '10%', textAlign: 'left' }}>Industry</th>
                    <th style={{ width: '15%', textAlign: 'left' }}>Start Date</th>
                    <th style={{ width: '15%', textAlign: 'left'}}>End Date</th>
                    <th style={{ width: '25%', textAlign: 'left' }}></th>
                </tr>
                </thead>

                    <tbody>  
                    {employmentList.map((emp) => (
                            <tr key={emp.Id}>
                                <td>{emp.Name}</td>
                                <td>{emp.Designation__c}</td>
                                <td>{emp.Industry__c}</td>
                                <td>{emp.Employment_Start_Date__c}</td>
                                <td>{emp.Employment_End_Date__c}</td>
                                <td>
                                    <button type='submit' className='buttonStyle' onClick={() => updateEmployment(emp.Id)} style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faPencil} />   Update
                                    </button>
                                    <button type='submit' className='buttonStyle' onClick={() => deleteEmpoyment(emp.Id)} style={{ backgroundColor:'#ba0517' }}><FontAwesomeIcon icon={faTrash} />   Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
                <div className='newFamily'>
                    <div className="modal-overlay">
                    <ToastContainer/>
                        <div className="modal">
                            <div className="modal-header">
                                <button className="close-button" onClick={onModalClose}>
                                    &times;        
                                </button>
                                <h3>Employment Details</h3>
                            </div>
                            <div className="modal-body" style={{overflowY:'auto', height:'40rem'}}>
                                <form>
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label htmlFor="ApplicationNo">Organisation Name</label>
                                            <input type="text" name="OrganisationName" value={organisationName}  onChange={(e) => setOrganisationName(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="CommunityStatus">City</label>
                                            <input type="text" name="City" value={city}  onChange={(e) => setCity(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="Semester">State</label>
                                            <input type="text" name="State" value={state}  onChange={(e) => setState(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Country</label>
                                            <select className='input-name' name="country" value={country}  onChange={(e) => setCountry(e.target.value)}>
                                            {countryOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Employment Start Date</label>
                                            <input type="date" name="EmploymentStartDate" value={employmentStartDate}  onChange={(e) => setEmploymentStartDate(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Employment End Date</label>
                                            <input type="date" name="EmploymentEndDate" value={employmentEndDate}  onChange={(e) => setEmploymentEndDate(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Telephone</label>
                                            <input type="text"  name="Telephone" value={telephone}  onChange={(e) => setTelephone(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Salary</label>
                                            <input type="text" name="Salary" value={salary}  onChange={(e) => setSalary(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Starting Position</label>
                                            <input type="text" name="StartingPosition" value={startingPosition}  onChange={(e) => setStartingPosition(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Current Position</label>
                                            <input type="text" name="CurrentPosition" value={currentPosition}  onChange={(e) => setCurrentPosition(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Starting Compensation(Annual Base)</label>
                                            <input type="text" name="StartingCompensation(AnnualBase)" value={annualBaseSC}  onChange={(e) => setAnnualBaseSC(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Starting Compensation(Annual Bonus)</label>
                                            <input type="text" name="StartingCompensation(AnnualBonus)" value={annualBonusSC}  onChange={(e) => setAnnualBonusSC(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Ending Compensation(Annual Base)</label>
                                            <input type="text" name="EndingCompensation(AnnualBase)" value={annualBaseEC}  onChange={(e) => setAnnualBaseEC(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Ending Compensation(Annual Bonus)</label>
                                            <input type="text" name="EndingCompensation(AnnualBase)" value={annualBonusEC}  onChange={(e) => setAnnualBonusEC(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Industry</label>
                                            <select className='input-name' name="industry" required value={industry}  onChange={(e) => setIndustry(e.target.value)}>
                                            {industryOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Job Function</label>
                                            <select className='input-name' name="jobfunction" value={jobFunction}  onChange={(e) => setJobFunction(e.target.value)}>
                                            {jobFunctionOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Website</label>
                                            <input type="text" name="Website" value={website}  onChange={(e) => setWebsite(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Role and Responsibilities</label>
                                            <textarea type="text" name="RoleandResponsibilities" value={roleAndResponsibilities}  onChange={(e) => setRoleAndResponsibilities(e.target.value)}></textarea>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Company / Organization Description</label>
                                            <textarea type="text" name="Company/OrganizationDescription" value={company}  onChange={(e) => setCompany(e.target.value)}></textarea>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Reason for Leaving</label>
                                            <textarea type="text" name="ReasonforLeaving" value={reasonForLeaving}  onChange={(e) => setReasonForLeaving(e.target.value)}></textarea>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Key Accomplishments</label>
                                            <textarea type="text" name="KeyAccomplishments" value={keyAccomplishments}  onChange={(e) => setKeyAccomplishments(e.target.value)}></textarea>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Most Significant Challenges</label>
                                            <textarea type="text" name="MostSignificantChallenges" value={mostSignificantChallenges}  onChange={(e) => setMostSignificantChallenges(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="buttonStyle" style={{ marginRight: '10px' }} onClick={onModalClose}>Cancel</button>
                                <button className="buttonStyle" onClick={onSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                <div className='buttonsDiv'><button type='submit' onClick={addNewEmployment} className='buttonStyle'><FontAwesomeIcon className='plusIcon' icon={faPlus} />   Add New</button></div>
                {/* <div className='continueButton'><button type='submit' className='buttonStyle'>Continue</button></div> */}
            </div>
       
    );
}


export default EmploymentDetails;