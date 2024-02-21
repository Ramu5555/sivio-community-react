import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import './EducationDetails.css';
import { FadeLoader  } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt, faArrowAltCircleUp  } from '@fortawesome/free-solid-svg-icons';


import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


  
function EducationDetails(){
   

    const pythonDomain = 'http://localhost:5000/';

    const [educationList, seteducationList] = useState([]);
    const [modal, setModal] = useState(false);
    const [fileModal, seFileModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [countryOptions, setcountryOptions] = useState(useState(new Map()));
    const [levelofStudyOptions, setLevelofStudyOptions] = useState(useState(new Map())); 
    const [degreeClassOptions, setDegreeClassOptions] = useState(useState(new Map()));
    const [fieldofStudyOptions, setFieldofStudyOptions] = useState(useState(new Map()));
    const [marksorGPAOptions, setMarksorGPAOptions] = useState(useState(new Map()));

    const [eduId, setEduId] = useState();
    const[schoolCollege,setSchoolCollege] = useState();
    const[country,setCountry] = useState();
    const[startDate,setStartDate] = useState(); 
    const[endDate,setEndDate] = useState();
    const[levelofStudy,setLevelofStudy] = useState();
    const[degreeClass,setDegreeClass] = useState();
    const[fieldofStudy,setFieldofStudy] = useState();
    const[boardUniversity,setBoardUniversity] = useState();
    const[specialization,setSpecialization] = useState();
    const[yearofPassing,setYearofPassing] = useState();
    const[courseDuration,setCourseDuration] = useState();
    const[marksGPA,setMarksGPA] = useState();
    const[GPA, setGPA] = useState();
    const[obtainedMarks, setObtainedMarks] = useState();
    const[totalMarks,setTotalMarks] = useState();


    const[GPAboolean,setGPAboolean] = useState(false);
    const[obtainedMarksboolean,setObtainedMarksboolean] = useState(false);
    const[totalMarksboolean,setTotalMarksboolean] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const[educationId, setEducationId] = useState();
    const[transcriptFile, setTranscriptFile] = useState(null);
    const[DCFile, setDCFile] = useState(null);


    useEffect(() => {
        // if(educationList === undefined){
            axios.post(`${pythonDomain}educationDetails`)
            .then(response => {
                seteducationList(response.data);
                console.log('EducationDetails:: ',response.data)
            }) 
            .catch(error => { 
                console.error('EducationDetails Error fetching data:', error); 
            });
        //}
    }, []);

    
    const addNewEducation = () =>{
        setModal(true)
        setLoading(true)
        axios.post(`${pythonDomain}educationPickLists`)
        .then(response => {
            const noneOption = { id: null, name: '--None--' };
            const countryOptions = [noneOption, ...Object.entries(response.data.countryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const LevelofStudyOptions = [noneOption, ...Object.entries(response.data.levelofStudyPickList).map(([key, value]) => ({ id: key, name: value }))];
            const DegreeClassOptions = [noneOption, ...Object.entries(response.data.degreeorClassPickList).map(([key, value]) => ({ id: key, name: value }))];
            const FieldofStudyOptions = [noneOption, ...Object.entries(response.data.fieldofStudyPickList).map(([key, value]) => ({ id: key, name: value }))];
            const marksorGPAOptions = [noneOption, ...Object.entries(response.data.marksorGPAPickList).map(([key, value]) => ({ id: key, name: value }))];              
            setcountryOptions(countryOptions);
            setLevelofStudyOptions(LevelofStudyOptions);
            setDegreeClassOptions(DegreeClassOptions);
            setFieldofStudyOptions(FieldofStudyOptions);
            setMarksorGPAOptions(marksorGPAOptions);
            
            if(countryOptions !== undefined && LevelofStudyOptions !==undefined && DegreeClassOptions !== undefined && FieldofStudyOptions !== undefined){
                setLoading(false)
                setModal(true)
            }
        }) 
        .catch(error => { 
            console.error('Error fetching data:', error); 
        });
    }
    
    const onMarksGPAChange = (marksGPA) => {
        setGPAboolean(false);
        setTotalMarksboolean(false);
        setObtainedMarksboolean(false);
        setMarksGPA(marksGPA);
        console.log(marksGPA);
        if(marksGPA === 'GPA'){
            setGPAboolean(true);
        }else if(marksGPA === 'Marks'){
            setTotalMarksboolean(true);
            setObtainedMarksboolean(true);
        }
        else{
            setGPAboolean(false);
            setTotalMarksboolean(false);
            setObtainedMarksboolean(false);
        }
    }
    
    const updateEducation = (educationId) =>{
        console.log('educationId:', educationId);
        setLoading(true);
        setModal(true);
        axios.post(`${pythonDomain}updateEducationRecord?educationRecordId=${educationId}`)
        .then(response => {
            console.log('FamilyDetails:: ',response.data.educationRecord)
            let eduRec = response.data.educationRecord;

            setEduId(eduRec.Id)
            setSchoolCollege(eduRec.School_College__c)
            setCountry(eduRec.Country__c)
            setStartDate(eduRec.Start_Date__c)
            setEndDate(eduRec.End_Date__c)
            setLevelofStudy(eduRec.Level_Of_Study__c)
            setDegreeClass(eduRec.Degree__c)
            setFieldofStudy(eduRec.Field_Of_Study__c)
            setBoardUniversity(eduRec.Board_University__c)
            setSpecialization(eduRec.Specialization__c)
            setYearofPassing(eduRec.Year_of_Passing__c)
            setCourseDuration(eduRec.Course_Duration__c)
            setMarksGPA(eduRec.Marks_GPA__c)
            setGPA(eduRec.GPA__c)
            setObtainedMarks(eduRec.Marks_Obtained__c)
            setTotalMarks(eduRec.Max_Marks__c)

            if(eduRec.Marks_GPA__c === 'GPA'){
                setGPAboolean(true);
            }else if(eduRec.Marks_GPA__c === 'Marks'){
                setTotalMarksboolean(true);
                setObtainedMarksboolean(true);
            }
            else{
                setGPAboolean(false);
                setTotalMarksboolean(false);
                setObtainedMarksboolean(false);
            }

            const noneOption = { id: null, name: '--None--' };
            const countryOptions = [noneOption, ...Object.entries(response.data.countryPickList).map(([key, value]) => ({ id: key, name: value }))];
            const LevelofStudyOptions = [noneOption, ...Object.entries(response.data.levelofStudyPickList).map(([key, value]) => ({ id: key, name: value }))];
            const DegreeClassOptions = [noneOption, ...Object.entries(response.data.degreeorClassPickList).map(([key, value]) => ({ id: key, name: value }))];
            const FieldofStudyOptions = [noneOption, ...Object.entries(response.data.fieldofStudyPickList).map(([key, value]) => ({ id: key, name: value }))];
            const marksorGPAOptions = [noneOption, ...Object.entries(response.data.marksorGPAPickList).map(([key, value]) => ({ id: key, name: value }))];              
            setcountryOptions(countryOptions);
            setLevelofStudyOptions(LevelofStudyOptions);
            setDegreeClassOptions(DegreeClassOptions);
            setFieldofStudyOptions(FieldofStudyOptions);
            setMarksorGPAOptions(marksorGPAOptions);

            setLoading(false);

        }) 
        .catch(error => { 
            console.error('Education Error fetching data:', error); 
        });
        
    }
    const onFileModalClose = (e) => {
        seFileModal(false);
      };

      const handleUpload = (eduId) => {
        seFileModal(true);
        setEducationId(eduId);
      };

      const handleTranscriptFileChange = (event) => {
        setTranscriptFile(event.target.files[0]);
        console.log(event.target.files[0])
      }
      const handleDCFileChange = (event) => {
        setDCFile(event.target.files[0])
        console.log(event.target.files[0])
      }

      const handleUploadTranscript = async (e) => {
        console.log('educationId: '+educationId);

            const file = transcriptFile;
            if (file != null) {
            setErrorMessage(false);
            const data = new FormData();
            console.log(data)
            data.append('file_from_react', file);
            data.append('eduId', educationId);
        
            let response = await fetch('api/uploadTranscript',
                {
                method: 'post',
                body: data,
                }
            );
            let res = await response.json();
            console.log('Response : ',res)
            if(res === 'Transcript Successfully Uploaded'){
                toast.success(res, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            }else{
                toast.error(res, {
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
            }
            else{
            setErrorMessage('Please Select File')
            }
      }
      const handleUploadDegreeCertificate = async (e) => {

        console.log('educationId: '+educationId);
        const file = DCFile;
        if (file != null) {
        setErrorMessage(false);
        const data = new FormData();
        console.log(data)
        data.append('file_from_react', file);
        data.append('eduId', educationId);
    
        let response = await fetch('api/uploadDegreeCertificate',
            {
            method: 'post',
            body: data,
            }
        );
        let res = await response.json();
        console.log('Response : ',res)
        if(res === 'DC Successfully Uploaded'){
            toast.success(res, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }else{
            toast.error(res, {
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
        }
        else{
        setErrorMessage('Please Select File')
        }
      }


    const deleteEducation = (educationId) =>{
        console.log('educationId:', educationId);
        setLoading(true);
        axios.post(`${pythonDomain}deleteEducationRecord?educationRecordId=${educationId}`)
            .then(response => {
                console.log('Education DElete Response:: ',response.data)
                if(response.data === 'Education Record Successfully Deleted'){
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
                      axios.post(`${pythonDomain}educationDetails`)
                        .then(response => {
                            seteducationList(response.data);
                            console.log('EducationDetails:: ',response.data)
                            setLoading(false);
                        }) 
                        .catch(error => { 
                            console.error('EducationDetails Error fetching data:', error); 
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
                toast.error(error, {
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
    const onSave =() =>{

        const educationRecordData = {id:eduId,schoolCollege:schoolCollege,country:country,startDate:startDate,endDate:endDate,
        levelofStudy:levelofStudy,degreeClass:degreeClass,fieldofStudy:fieldofStudy,boardUniversity:boardUniversity,specialization:specialization,
        yearofPassing:yearofPassing,courseDuration:courseDuration,marksGPA:marksGPA,GPA:GPA,obtainedMarks:obtainedMarks,totalMarks:totalMarks}

        console.log('educationRecordData:: ',JSON.stringify(educationRecordData))   
        
        axios.post(`${pythonDomain}newEducationRecord?educationRecord=${JSON.stringify(educationRecordData)}`)
        .then(response => {
            console.log('educationData:: ',response.data)
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

                  axios.post(`${pythonDomain}educationDetails`)
                        .then(response => {
                            seteducationList(response.data);
                            console.log('EducationDetails:: ',response.data)
                            setLoading(false);
                        }) 
                        .catch(error => { 
                            console.error('EducationDetails Error fetching data:', error); 
                        });
                setModal(false);
                setSchoolCollege('');
                setCountry('');
                setStartDate('');
                setEndDate('');
                setLevelofStudy('');
                setDegreeClass('');
                setFieldofStudy('');
                setBoardUniversity('');
                setSpecialization('');
                setYearofPassing('');
                setCourseDuration('');
                setMarksGPA('');
                setGPA('');
                setObtainedMarks('');
                setTotalMarks('');
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
            console.error('EducationData Error fetching data:', error); 
        }); 

    }
    const onModalClose =() =>{
        setModal(false);
        setSchoolCollege('');
        setCountry('');
        setStartDate('');
        setEndDate('');
        setLevelofStudy('');
        setDegreeClass('');
        setFieldofStudy('');
        setBoardUniversity('');
        setSpecialization('');
        setYearofPassing('');
        setCourseDuration('');
        setMarksGPA('');
        setGPA('');
        setObtainedMarks('');
        setTotalMarks('');
        setGPAboolean(false);
        setTotalMarksboolean(false);
        setObtainedMarksboolean(false);
    }

       
           

    return (
        <div>
            <div className='PageTitle'>Education Details</div>
            {loading && (
                        <div className="spinner-container">
                            <FadeLoader  color={'#000000'} loading={loading} size={100} />
                        </div>
                    )}
            
            <div className='FamilyTable'>
                <table style={{width:'100%',paddingTop:'10px'}}>
                <thead>
                 <tr>
                    <th style={{ width: '15%', textAlign: 'left' }}>Qualification</th>
                    <th style={{ width: '20%', textAlign: 'left' }}>Board/University</th>
                    <th style={{ width: '10%', textAlign: 'left' }}>GPA</th>
                    <th style={{ width: '10%', textAlign: 'left' }}>Marks(%)</th>
                    <th style={{ width: '15%', textAlign: 'left'}}>Transcript</th>
                    <th style={{ width: '15%', textAlign: 'left'}}>Degree Certificate</th>
                    <th style={{ width: '15%', textAlign: 'center' }}></th>
                </tr>
                </thead>

                    <tbody>  
                    {educationList.map((edu) => (
                            <tr key={edu.Id}>
                                <td>{edu.Degree__c}</td>
                                <td>{edu.Board_University__c}</td>
                                <td>{edu.GPA__c}</td>
                                <td>{edu.Percentage__c}</td>
                                <td>{edu.Transcript_File_Name__c}</td>
                                <td>{edu.Degree_Certificate_File_Name__c}</td>
                                <td>
                                    <button className='buttonStyle' style={{ marginBottom: '5px' }} onClick={() => handleUpload(edu.Id)}><FontAwesomeIcon className='plusIcon' icon={faArrowAltCircleUp} />   Attach</button>
                                    <button type='submit' className='buttonStyle' onClick={() => updateEducation(edu.Id)} style={{ marginBottom: '5px' }}><FontAwesomeIcon icon={faPencil} />  Update
                                    </button>
                                    <button type='submit' className='buttonStyle' onClick={() => deleteEducation(edu.Id)} style={{ backgroundColor:'#ba0517' }}><FontAwesomeIcon icon={faTrash} />   Delete
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
                                <h3>Education Details</h3>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="account-details">
                                        <div className="custom-select">
                                            <label htmlFor="ApplicationNo">School/College</label>
                                            <input type="text" name="School/College" value={schoolCollege}  onChange={(e) => setSchoolCollege(e.target.value)}></input>
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
                                            <label htmlFor="SubmittedDate">Start Date</label>
                                            <input type="date" name="StartDate" value={startDate}  onChange={(e) => setStartDate(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">End Date</label>
                                            <input type="date" name="EndDate" value={endDate}  onChange={(e) => setEndDate(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Level of Study</label>
                                            <select className='input-name' name="LevelofStudy" value={levelofStudy}  onChange={(e) => setLevelofStudy(e.target.value)}>
                                                {levelofStudyOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Degree / Class</label>
                                            <select className='input-name' name="Degree/Class" value={degreeClass}  onChange={(e) => setDegreeClass(e.target.value)}>
                                            {degreeClassOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Field of Study</label>
                                            <select className='input-name' name="FieldofStudy" value={fieldofStudy}  onChange={(e) => setFieldofStudy(e.target.value)}>
                                            {fieldofStudyOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Board / University</label>
                                            <input type="text" name="Board/University" value={boardUniversity}  required onChange={(e) => setBoardUniversity(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Specialization</label>
                                            <input type="text" name="Specialization" value={specialization}  onChange={(e) => setSpecialization(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Year of Passing</label>
                                            <input type="text" name="YearofPassing" value={yearofPassing} required  onChange={(e) => setYearofPassing(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Course Duration(in Years)</label>
                                            <input type="text" name="CourseDuration(inYears)" value={courseDuration}  onChange={(e) => setCourseDuration(e.target.value)}></input>
                                        </div>
                                        <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Marks / GPA</label>
                                            <select className='input-name' name="Marks/GPA" required value={marksGPA}  onChange={(e) => onMarksGPAChange(e.target.value)}>
                                            {marksorGPAOptions.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {GPAboolean && (
                                            <div className="custom-select">
                                                <label htmlFor="SubmittedDate">GPA</label>
                                                <input type="text" name="GPA" value={GPA}  onChange={(e) => setGPA(e.target.value)}></input>
                                            </div>
                                        )
                                        }
                                        
                                        {obtainedMarksboolean && (
                                            <div className="custom-select">
                                                <label htmlFor="SubmittedDate">Marks Obtained</label>
                                                <input type="text" name="obtainedMarks" value={obtainedMarks}  onChange={(e) => setObtainedMarks(e.target.value)}></input>
                                            </div>
                                        )}
                                        
                                        {totalMarksboolean && (
                                            <div className="custom-select">
                                            <label htmlFor="SubmittedDate">Total Marks</label>
                                            <input type="text" name="totalMarks" value={totalMarks}  onChange={(e) => setTotalMarks(e.target.value)}></input>
                                        </div>
                                        )}
                                        
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
                <div className='buttonsDiv'><button type='submit' onClick={addNewEducation} className='buttonStyle'><FontAwesomeIcon className='plusIcon' icon={faPlus} />   Add New</button></div>
                {/* <div className='continueButton'><button type='submit' className='buttonStyle'>Continue</button></div> */}
                {fileModal && (
                    <div className='fileModal'>
                        <div className="modal-overlay">
                            <div className="modal">
                                <div className="modal-header">
                                    <h3>Upload Documents</h3>
                                    {/* <button className="close-button" onClick={onFileModalClose}>
                                        &times;        
                                    </button> */}
                                </div>
                                <div className="modal-body">
                                    <div style={{margin:'20px'}}>
                                        <label>Upload Transcript</label>
                                        <input type="file" id="images" required onChange={handleTranscriptFileChange}></input>
                                        <button className='buttonStyle' onClick={handleUploadTranscript}><FontAwesomeIcon className='plusIcon' icon={faArrowAltCircleUp} />   Upload</button>
                                    </div>
                                    <div style={{margin:'20px'}}>
                                        <label>Upload Degree Certificate</label>
                                        <input type="file" id="images" required onChange={handleDCFileChange}></input>
                                        <button className='buttonStyle' onClick={handleUploadDegreeCertificate}><FontAwesomeIcon className='plusIcon' icon={faArrowAltCircleUp} />   Upload</button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="buttonStyle" style={{ float: 'right', margin:'0 10px 8px 0'}} onClick={onFileModalClose}>close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )}
            </div>
       
    );
}


export default EducationDetails;