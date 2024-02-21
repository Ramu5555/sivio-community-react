import React, { useState } from 'react';
import './Resume.css';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faArrowAltCircleUp  } from '@fortawesome/free-solid-svg-icons';

function Resume(){
    const [selectedFile, setSelectedFile] = useState(null);
    const[error, setError] = useState('');
    const[errorMessage, setErrorMessage] = useState(false);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0])
    };
    const handleUpload = async (e) => {
        const file = selectedFile;
        if (file != null) {
          setErrorMessage(false);
          const data = new FormData();
          console.log(data)
          data.append('file_from_react', file);
      
          let response = await fetch('api/uploadResume',
            {
              method: 'post',
              body: data,
            }
          );
          let res = await response.json();
          console.log('Response : ',res)
          if(res === 'Please select PDF'){
            setError(true);
            setErrorMessage('Please select PDF')
          }else if(res === 'Resume Successfully Uploaded'){
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
          setError(true);
          setErrorMessage('Please Select Resume')
        }
      };
    return (
      <>
        <div className='PageTitle'>Resume</div>
        <div style={{margin:'10px 0'}}>
          <b>Instructions: </b>
          Please Provide a current resume or CV. Ideally, this would be about 1-2 pages in length and include dates and locations of your employment.
          <br></br><br></br>Upload a PDF document:

        </div>
          <div style={{marginTop:'35px'}}>
          {error && <div className='invalidError'>{errorMessage}</div>}
          <input type="file" id="images" required onChange={handleFileChange}></input>
          <button className='buttonStyle' onClick={handleUpload}><FontAwesomeIcon className='plusIcon' icon={faArrowAltCircleUp} />   Upload</button>
        </div>
      </>
      
    );
}


export default Resume;