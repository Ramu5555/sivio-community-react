
import React from 'react';
import { useState,useEffect } from "react";
import axios from 'axios';

import { FadeLoader  } from 'react-spinners';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./PersonalDetails.css";


function PersonalDetails(){

    const pythonDomain = 'http://localhost:5000/';

    const [conId, setConId] = useState('');
    const [prefix, setPrefix] = useState();
    const [first_name, setFirst_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [preferred_name, setPreferred_name] = useState('');
    const [address1, setAddress1] = useState('');
    const [city1, setCity1] = useState('');
    const [state1, setState1] = useState('');
    const [country1, setCountry1] = useState('');
    const [postal_code1, setPostalCode1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city2, setCity2] = useState('');
    const [state2, setState2] = useState('');
    const [country2, setCountry2] = useState('');
    const [postal_code2, setPostalCode2] = useState('');
    const [email, setEmail] = useState('');
    const [alternate_email, setAlternateEmail] = useState('');
    const [skype_id, setSkypeId] = useState('');
    const [home_phone, setHomePhone] = useState('');
    const [mobile_phone, setMobilePhone] = useState('');
    const [alternative_phone, setAlternativePhone] = useState('');
    const [gender, setGender] = useState('');
    const [native_language, setNativeLanguage] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [birth_country, setBirthCountry] = useState('');
    const [birth_city, setBirthCity] = useState('');
    const [citizenship, setCitizenship] = useState('');

    const [salutationOptions, setSalutationOptions] = useState(useState(new Map()));
    const [genderOptions, setGenderOptions] = useState(useState(new Map()));
    const [countryOptions, setCountryOptions] = useState(useState(new Map()));
    const [nativeLangOptions, setNativeLangOptions] = useState(useState(new Map()));

    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        // if(familyList === undefined){
            axios.post(`${pythonDomain}getPersonalDetails`)
            .then(response => {
                console.log('getPersonalDetails:: ',response.data.contactWrapper.Id)
                setConId(response.data.contactWrapper.Id);
                setPrefix(response.data.contactWrapper.Salutation);
                setLast_name(response.data.contactWrapper.LastName);
                setMiddle_name(response.data.contactWrapper.Middle_Name__c);
                setFirst_name(response.data.contactWrapper.FirstName);
                setPreferred_name(response.data.contactWrapper.Preferred_Name__c);
                setEmail(response.data.contactWrapper.Email);
                setAddress1(response.data.contactWrapper.OtherStreet);
                setCity1(response.data.contactWrapper.OtherCity);
                setState1(response.data.contactWrapper.OtherState);
                setCountry1(response.data.contactWrapper.OtherCountry);
                setPostalCode1(response.data.contactWrapper.OtherPostalCode);
                setAddress2(response.data.contactWrapper.MailingStreet);
                setCity2(response.data.contactWrapper.MailingCity);
                setState2(response.data.contactWrapper.MailingState);
                setCountry2(response.data.contactWrapper.MailingCountry);
                setPostalCode2(response.data.contactWrapper.MailingPostalCode);
                setAlternateEmail(response.data.contactWrapper.Alternate_Email__c);
                setSkypeId(response.data.contactWrapper.Skype_ID__c);
                setHomePhone(response.data.contactWrapper.HomePhone);
                setMobilePhone(response.data.contactWrapper.MobilePhone);
                setAlternativePhone(response.data.contactWrapper.Phone);
                setGender(response.data.contactWrapper.Gender__c);
                setNativeLanguage(response.data.contactWrapper.Native_Language__c);
                setBirthDate(response.data.contactWrapper.Birth_City__c);
                setBirthCountry(response.data.contactWrapper.Birth_Country__c);
                setBirthCity(response.data.contactWrapper.Birth_City__c);
                setCitizenship(response.data.contactWrapper.Country_of_Citizenship__c);

                const noneOption = { id: null, name: '--None--' };
                const salutationOptions = [noneOption, ...Object.entries(response.data.salutationPickList).map(([key, value]) => ({ id: key, name: value }))];
                const genderOptions = [noneOption, ...Object.entries(response.data.genderPickList).map(([key, value]) => ({ id: key, name: value }))];
                const countryOptions = [noneOption, ...Object.entries(response.data.countryPickList).map(([key, value]) => ({ id: key, name: value }))];
                const NativeLangOptions = [noneOption, ...Object.entries(response.data.nativeLangPickList).map(([key, value]) => ({ id: key, name: value }))];

                setSalutationOptions(salutationOptions);
                setGenderOptions(genderOptions);
                setCountryOptions(countryOptions);
                setNativeLangOptions(NativeLangOptions);
            }) 
            .catch(error => { 
                console.error('FamilyDetails Error fetching data:', error); 
            });
        //}
    }, []);

    const submitThis = async (event) => {
      setLoading(true);
      event.preventDefault();
      const conData = {conId: conId, firstName: first_name,  lastName: last_name, prefix: prefix, preferredName: preferred_name, middleName: middle_name,Email: email,
      address:address1,alternativeEmail: alternate_email,skypeId: skype_id,phone: alternative_phone,
      gender: gender,nativeLang: native_language,birthCountry: birth_country,homePhone:home_phone,
      city:city1,state:state1,country:country1,postalCode:postal_code1,mailingAddress:address2,mailingCity:city2,
      mailingState:state2,mailingCountry:country2,mailingPostalCode:postal_code2,mobilePhone:mobile_phone,birthDate:birth_date,birthCity:birth_city,citizenship:citizenship};
      console.log('familyRecordData:: ',JSON.stringify(conData))
      
      axios.post(`${pythonDomain}updatePersonalData?personalRecord=${JSON.stringify(conData)}`)
      .then(response => {
        setLoading(false);
          console.log('Personal Response: ',response.data);
          if(response.data === 'Contact Successfully Updated')
          {
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
          }
          else{
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
        setLoading(false);
        console.log('Personal Response: ',JSON.stringify(error));
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
    
       
    
   
    return( 
        <>
       

    <h3>Personal Details</h3>

    <div id='inputDiv' className='personalDetalis'>
      <ToastContainer/>
      {loading && (
                        <div className="spinner-container">
                            <FadeLoader  color={'#000000'} loading={loading} size={100} />
                        </div>
                    )}
            <h4 className='sectionTitle'>Name Information</h4>
              <div className="account-details">
                <div><label>Prefix</label>
                <select name="Prefix" id="Prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)}>
                {salutationOptions.map(option => (
                      <option key={option.id} value={option.id}>
                          {option.name}
                      </option>
                  ))}
                </select>
                </div>
                <div></div>
                <div><label >First Name </label><input type="text" value={first_name} name="FirstName" onChange={(e) => setFirst_name(e.target.value)}></input></div>
                <div><label>Middle Name </label><input type="text" value={middle_name} name="MiddleName" onChange={(e) => setMiddle_name(e.target.value)}></input></div>
                <div><label className='required-field'>Last Name </label><input type="text" value={last_name} name="LastName" required onChange={(e) => setLast_name(e.target.value)}></input></div>
                <div><label>Preferred Name </label><input type="text" value={preferred_name} name="PrefferedName" onChange={(e) => setPreferred_name(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Permanent Address</h4>
              <div className="account-details">
                <div><label>Address </label><textarea  value={address1} name="perAddress" rows="3" cols="50" onChange={(e) => setAddress1(e.target.value)}></textarea ></div>
                <div><label>City </label><input value={city1} type="text" name="perCity" onChange={(e) => setCity1(e.target.value)}></input></div>
                <div><label>State </label><input value={state1} type="text" name="perState" onChange={(e) => setState1(e.target.value)}></input></div>
                <div><label>Country </label>
                  <select value={country1} name="country1" id="country1" onChange={(e) => setCountry1(e.target.value)}>
                    {countryOptions.map(option => (
                          <option key={option.id} value={option.id}>
                              {option.name}
                          </option>
                      ))}
                  </select>
                </div>
                <div><label>Postal Code </label><input value={postal_code1} type="text" name="PerPostalCode" onChange={(e) => setPostalCode1(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Mailing Address</h4>
              <div className="account-details">
                <div><label>Address </label><textarea  value={address2} name="perAddress" rows="3" cols="50" onChange={(e) => setAddress2(e.target.value)}></textarea ></div>
                <div><label>City </label><input value={city2} type="text" name="perCity" onChange={(e) => setCity2(e.target.value)}></input></div>
                <div><label>State </label><input value={state2} type="text" name="perState" onChange={(e) => setState2(e.target.value)}></input></div>
                <div><label>Country </label>
                  <select value={country2} name="country2" id="country2" onChange={(e) => setCountry2(e.target.value)}>
                      {countryOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    </div>
                <div><label>Postal Code </label><input value={postal_code2} type="text" name="PerPostalCode" onChange={(e) => setPostalCode2(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Email Address</h4>
              <div className="account-details">
                <div><label className='required-field'>Email </label><input value={email} type="text" name="Email" onChange={(e) => setEmail(e.target.value)}></input></div>
                <div><label>Alternative Email </label><input value={alternate_email} type="text" name="altEmail" onChange={(e) => setAlternateEmail(e.target.value)}></input></div>
              </div>
          
            <h4 className='sectionTitle'>Skype ID</h4>
              <div className="account-details">
                <div><label>Skype Id </label><input value={skype_id} type="text" name="skypeId" onChange={(e) => setSkypeId(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Telephone Numbers</h4>
              <div className="account-details">
                <div><label>Phone </label><input value={alternative_phone} type="text" name="altPhone" onChange={(e) => setAlternativePhone(e.target.value)}></input></div>
                <div><label>Home Phone </label><input value={home_phone} type="text" name="homePhone" onChange={(e) => setHomePhone(e.target.value)}></input></div>
                <div><label>Mobile Phone </label><input  value={mobile_phone} type="text" name="mobilePhone" onChange={(e) => setMobilePhone(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Biographical Information</h4>
              <div className="account-details">
                <div><label>Gender </label><select value={gender} name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
                {genderOptions.map(option => (
                      <option key={option.id} value={option.id}>
                          {option.name}
                      </option>
                  ))}
                </select></div>
                <div><label>Native Language </label>
                  <select value={native_language} name="nativeLang" id="nativeLang" onChange={(e) => setNativeLanguage(e.target.value)}>
                    {nativeLangOptions.map(option => (
                          <option key={option.id} value={option.id}>
                              {option.name}
                          </option>
                    ))}
                  </select>
                </div>
                <div><label>Birth Date </label><input value={birth_date} type="date" name="birthDate" onChange={(e) => setBirthDate(e.target.value)}></input></div>
                <div><label>Birth Country </label><input value={birth_country} type="text" name="birthCountry" onChange={(e) => setBirthCountry(e.target.value)}></input></div>
                <div><label>Birth City </label><input value={birth_city} type="text" name="birthCity" onChange={(e) => setBirthCity(e.target.value)}></input></div>
                <div><label>Citizenship </label><input value={citizenship} type="text" name="citizenship" onChange={(e) => setCitizenship(e.target.value)}></input></div>
              </div>
            <h4 className='sectionTitle'>Select Languages You Know</h4>
            </div>
            <div className='contentdiv'>
              <button className='buttonStyle' onClick={submitThis}><FontAwesomeIcon icon={faPencil} />  Update</button>
              {/* <button type='submit' className='buttonStyle' style={{marginLeft:'10px'}}>Continue</button> */}
          </div>
          
            </>
    )
}


export default PersonalDetails;