import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Recommendations({appId}){

    const pythonDomain = 'http://localhost:5000/';

    const [loading, setLoading] = useState(false);
    const[recList, setRecList] = useState([]);

    const [modal, setModal] = useState(false);
    

    const [salutationOptions, setSalutationOptions] = useState(useState(new Map()));
    const [relationshipOptions, setRelationshipOptions] = useState(useState(new Map()));

    const [prefix, setPrefix] = useState();
    const[firstName,setFirstName] = useState();
    const[lastName,setLastName] = useState();
    const[organization,setOrganization] = useState();
    const[positionTitle,setPositionTitle] = useState();
    const[relationship,setRelationship] = useState();
    const[telephone,setTelephone] = useState();
    const[email,setEmail] = useState();
    const[signature,setSignature] = useState();
    const[waveRAR,setWaveRAR] = useState(false);
    const[dontWaveRAR,setDontWaveRAR] = useState(false);

    useEffect(() => {
        console.log('Application Id:::::: ',appId);
        axios.post(`${pythonDomain}RecommendationsDetails?appId=${appId}`)
            .then(response => {
                setRecList(response.data);
            })
            .catch(error => {
                console.error('Error fetching Recommendations details:', error);
            });
    }, []);

    const addNewRecommendation = () => {
        setLoading(true);
        axios.post(`${pythonDomain}recommendationPickLists`)
        .then(response => {
            console.log('relationshipOptions22:: ',JSON.stringify(response.data.relationshipPickList))
            const noneOption = { id: null, name: '--None--' };
            const relationshipOptions = [noneOption, ...Object.entries(response.data.relationshipPicklist).map(([key, value]) => ({ id: key, name: value }))];
            const prefixOptions = [noneOption, ...Object.entries(response.data.prefixPicklist).map(([key, value]) => ({ id: key, name: value }))];
          
            setRelationshipOptions(relationshipOptions);
            setSalutationOptions(prefixOptions);
            
            console.log('relationshipOptions:: ',relationshipOptions)
            if(relationshipOptions !== undefined && prefixOptions !==undefined){
                setLoading(false)
                setModal(true)
            }
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    }

    const onModalClose =() =>{
        setModal(false);
        setPrefix('');
        setFirstName('');
        setLastName('');
        setOrganization('');
        setPositionTitle('');
        setRelationship('');
        setTelephone('');
        setEmail('');
        setSignature('');
        setWaveRAR('');
        setDontWaveRAR('');

    }

    const onSave = () => {

        const recRecordData = {appId:appId,prefix:prefix,firstName:firstName,lastName:lastName,relationship:relationship,positionTitle:positionTitle,organization:organization,telephone:telephone,email:email,
            signature:signature,waveRAR:waveRAR,dontWaveRAR:dontWaveRAR}

        console.log('recRecordData:: ',JSON.stringify(recRecordData))

        axios.post(`${pythonDomain}newRecRecord?recRecord=${JSON.stringify(recRecordData)}`)
        .then(response => {
            console.log('recData:: ',response.data)
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
                  axios.post(`${pythonDomain}RecommendationsDetails?appId=${appId}`)
                  .then(response => {
                      setRecList(response.data);
                  })
                  .catch(error => {
                      console.error('Error fetching Recommendations details:', error);
                  });
                setModal(false);
                setPrefix('');
                setFirstName('');
                setLastName('');
                setOrganization('');
                setPositionTitle('');
                setRelationship('');
                setTelephone('');
                setEmail('');
                setSignature('');
                setWaveRAR('');
                setDontWaveRAR('');

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
            console.error('familyData Error fetching data:', JSON.stringify(error)); 
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        });

    }
    return (
        <div>
            <div className='PageTitle'>Recommendations</div>
            {loading && (
                <div className="spinner-container">
                    <FadeLoader color={'#000000'} loading={loading} size={100} />
                </div>
            )}

            <div className='FamilyTable'>
                <table style={{ width: '100%', paddingTop: '10px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '25%', textAlign: 'left' }}>Name</th>
                            <th style={{ width: '25%', textAlign: 'left' }}>Organization</th>
                            <th style={{ width: '25%', textAlign: 'left' }}>Position/Title</th>
                            <th style={{ width: '25%', textAlign: 'left' }}>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recList.map((rec) => (
                            <tr key={rec.Id}>
                                <td>{rec.First_Name__c} {rec.Last_Name__c}</td>
                                <td>{rec.Organization__c}</td>
                                <td>{rec.Position_Title__c}</td>
                                <td>{rec.Status__c}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='buttonsDiv'><button type='submit' onClick={addNewRecommendation} className='buttonStyle'><FontAwesomeIcon className='plusIcon' icon={faPlus} />   Add New</button></div>

            {modal && (
                <div className='newFamily'>
                    <div className="modal-overlay">
                    <ToastContainer/>
                        <div className="modal">
                            <div className="modal-header">
                                <button className="close-button" onClick={onModalClose}>
                                    &times;        
                                </button>
                                <h3>Education Details</h3>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label>Prefix</label>
                                            <select name="Prefix" id="Prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)}>
                                            {salutationOptions.map(option => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                        <label htmlFor="firstName">First Name</label>
                                            <input type="text" name="FirstName" value={firstName}  onChange={(e) => setFirstName(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                        <label htmlFor="LastName">Last Name</label>
                                            <input type="text" name="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="Organization">Organization</label>
                                            <input type="text" name="organization" value={organization}  onChange={(e) => setOrganization(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="PositionTitle">Position/Title</label>
                                            <input type="text" name="positionTitle" value={positionTitle}  onChange={(e) => setPositionTitle(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="Relationship">Relationship</label>
                                            <select className='input-name' name="Relationship" value={relationship}  onChange={(e) => setRelationship(e.target.value)}>
                                            {relationshipOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                        <label htmlFor="Telephone">Telephone</label>
                                            <input type="text" name="Telephone" value={telephone}  onChange={(e) => setTelephone(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="Email">Email</label>
                                            <input type="text" name="Email" value={email}  required onChange={(e) => setEmail(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="waveRAR">I waive my right to access this report.</label>
                                            <input type="checkbox" name="decewaveRARased" checked={waveRAR} onChange={(e) => setWaveRAR(e.target.checked)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="dontWaveRAR">I do not waive my right to access this report</label>
                                            <input type="checkbox" name="decewaveRARased" checked={dontWaveRAR} onChange={(e) => setDontWaveRAR(e.target.checked)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="signature">In place of your signature, please type your full legal name:</label>
                                            <input type="text" name="signature" value={signature}  onChange={(e) => setSignature(e.target.value)}></input>
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
        </div>
    );
}


export default Recommendations;