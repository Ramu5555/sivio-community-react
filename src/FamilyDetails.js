import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import './FamilyDetails.css';
import { FadeLoader  } from 'react-spinners';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
      
function FamilyDetails(){
    // ------------------------------------------------Variable Declaration Starts here---------------------------------------------------
    const [familyList, setfamilyList] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [relationshipOptions, setrelationshipOptions] = useState(useState(new Map()));
    const [genderOptions, setgenderOptions] = useState(useState(new Map()));
    const [industryOptions, setindustryOptions] = useState(useState(new Map()));
    const [countryOptions, setcountryOptions] = useState(useState(new Map()));
    const [HLEOptions, setHLEOptions] = useState(useState(new Map()));

    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[relationship,setRelationship] = useState('');
    const[occupation,setOccupation] = useState('');
    const[employer,setEmployer] = useState('');
    const[gender,setGender] = useState('');
    const[dateofBirth,setDateofBirth] = useState('');
    const[qualification,setQualification] = useState('');
    const[contactNumber,setContactNumber] = useState('');
    const[email,setEmail] = useState('');
    const[industry,setIndustry] = useState('');
    const[country,setCountry] = useState('');
    const[state,setState] = useState('');
    const[city,setCity] = useState('');
    const[highestLevelofStudy,setHighestLevelofStudy] = useState('');
    const[IfDeceased,setIfDeceased] = useState(false);


    useEffect(() => {
        // if(familyList === undefined){
            axios.get('http://localhost:5000/api/familyDetails')
            .then(response => {
                setfamilyList(response.data);
                console.log('FamilyDetails:: ',response.data)
            }) 
            .catch(error => { 
                console.error('FamilyDetails Error fetching data:', error); 
            });
        //}
    }, []);

    const addNewFamily = ()=>{
        setLoading(true)
        axios.get('http://localhost:5000/api/familyPickLists')
        .then(response => {
            console.log('relationshipOptions22:: ',JSON.stringify(response.data.relationshipPickList))
            const noneOption = { id: null, name: '--None--' };
            const relationshipOptions = [noneOption, ...Object.entries(response.data.relationshipPickList).map(([key, value]) => ({ id: key, name: value }))];
            const genderOptions = [noneOption, ...Object.entries(response.data.genderPickList).map(([key, value]) => ({ id: key, name: value }))];
            const industryOptions = [noneOption, ...Object.entries(response.data.industryPickiList).map(([key, value]) => ({ id: key, name: value }))];
            const countryOptions = [noneOption, ...Object.entries(response.data.countryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const HLEOptions = [noneOption, ...Object.entries(response.data.HLEpickList).map(([key, value]) => ({ id: key, name: value }))];

            setrelationshipOptions(relationshipOptions);
            setgenderOptions(genderOptions);
            setindustryOptions(industryOptions);
            setcountryOptions(countryOptions);
            setHLEOptions(HLEOptions);
            console.log('relationshipOptions:: ',relationshipOptions)
            if(relationshipOptions !== undefined && genderOptions !==undefined && industryOptions !== undefined && countryOptions !== undefined && HLEOptions !== undefined){
                setLoading(false)
                setModal(true)
            }
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    }
    const onModalClose = ()=>{
        setModal(false);
        setFirstName('');
        setLastName('');
        setRelationship('');
        setOccupation('');
        setEmployer('');
        setGender('');
        setDateofBirth('');
        setQualification('');
        setContactNumber('');
        setEmail('');
        setIndustry('');
        setCountry('');
        setState('');
        setCity('');
        setHighestLevelofStudy('');
        setIfDeceased(false);
    }
   
    const updateFamily = () =>{
        setModal(true);
    }
    const deleteFamily = () =>{

    }
    const onSave =() =>{

        const familyRecordData = {firstName:firstName,lastName:lastName,relationship:relationship,occupation:occupation,employer:employer,gender:gender,dateofBirth:dateofBirth,
                                  qualification:qualification,contactNumber:contactNumber,email:email,industry:industry,country:country,state:state,city:city,highestLevelofStudy:highestLevelofStudy,
                                  IfDeceased:IfDeceased}

        console.log('familyRecordData:: ',JSON.stringify(familyRecordData))

        axios.get(`http://localhost:5000/api/newFamilyRecord?familyRecord=${JSON.stringify(familyRecordData)}`)
        .then(response => {
            console.log('familyData:: ',response.data)
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
                setModal(false);
                setFirstName('');
                setLastName('');
                setRelationship('');
                setOccupation('');
                setEmployer('');
                setGender('');
                setDateofBirth('');
                setQualification('');
                setContactNumber('');
                setEmail('');
                setIndustry('');
                setCountry('');
                setState('');
                setCity('');
                setHighestLevelofStudy('');
                setIfDeceased(false);
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
            console.error('familyData Error fetching data:', error); 
        }); 
    }

    return (
        <div >
            <div className='PageTitle'>Family Details</div>
            {loading && (
                        <div className="spinner-container">
                            <FadeLoader  color={'#000000'} loading={loading} size={100} />
                        </div>
                    )}
            <div className='FamilyTable'>
                <table style={{width:'100%',paddingTop:'10px'}}>
                    <thead>
                        <tr>
                            <th style={{width:'25%',textAlign:'left'}}>Name</th>
                            <th style={{width:'25%',textAlign:'left'}}>Relationship</th>
                            <th style={{width:'25%',textAlign:'left'}}></th>
                        </tr>
                    </thead>
                    <tbody>  
                        {familyList.map((fam) => (
                            <tr key={fam.id}>
                                <td>{fam.firstName} {fam.lastName}</td>
                                <td>{fam.relationship}</td>
                                <td>
                                    <button type='submit' className='buttonStyle' onClick={updateFamily} style={{ marginRight: '10px' }}>
                                        Update
                                    </button>
                                    <button type='submit' className='buttonStyle' onClick={deleteFamily} style={{ backgroundColor:'#ba0517' }}>
                                        Delete
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
                                <h3>Application Details</h3>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label htmlFor="ApplicationNo">First Name</label>
                                            <input type="text" name="FirstName" value={firstName}  onChange={(e) => setFirstName(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="CommunityStatus">Last Name</label>
                                            <input type="text" name="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="Semester">Relationship</label>
                                            <select name="Relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                                                {relationshipOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Occupation/Title</label>
                                            <input type="text" name="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Employer</label>
                                            <input type="text" name="Employer" value={employer} onChange={(e) => setEmployer(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Gender</label>
                                            <select name="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                {genderOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">DOB</label>
                                            <input type="date" value={dateofBirth} name="DOB" onChange={(e) => setDateofBirth(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Qualification</label>
                                            <input type="text" name="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Contact Number</label>
                                            <input type="text" name="ContactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Email</label>
                                            <input type="text" name="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Industry</label>
                                            <select name="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                                                {industryOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Country</label>
                                            <select name="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
                                                {countryOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">State</label>
                                            <input type="text" name="State" value={state} onChange={(e) => setState(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Highest Level of Education</label>
                                            <select name="hle" value={highestLevelofStudy} onChange={(e) => setHighestLevelofStudy(e.target.value)}>
                                                {HLEOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">City</label>
                                            <input type="text" name="City" value={city} onChange={(e) => setCity(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">If deceased,Please check</label>
                                            <input type="checkbox" name="deceased" value={IfDeceased} onChange={(e) => setIfDeceased(e.target.value)}></input>
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
            <div>
                <div className='buttonsDiv'><button type='submit' onClick={addNewFamily} className='buttonStyle'><i className="fa fa-plus"></i>Add New</button></div>
                <div className='continueButton'><button type='submit' className='buttonStyle'>Continue</button></div>
            </div>
        </div>
    );
}


export default FamilyDetails;