import React, { useState } from 'react';
import axios from 'axios';

function Resume(){
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0])
    };
    const handleUpload = async (e) => {
        const file = selectedFile;
        if (file != null) {
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
        }
      };
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}


export default Resume;