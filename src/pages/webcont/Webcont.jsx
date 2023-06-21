import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Webcont() {

  const [ip, setIp] = useState('');
  const [info, SetInfo] = useState(null);

  const handleChange = (e) => {
    setIp(e.target.value);
  }

  let API_URL = `https://website-contacts.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domainName=${ip}`;
  const handleClick = async () => {
    await fetch(API_URL)
      .then(async (data) => {
        let k = await data.json()
        console.log(k);
        SetInfo(k)
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <>
      <CssBaseline />
      <Box style={{ marginTop: '10px', padding: '25px' }} sx={{ display: 'inline-flex', bgcolor: '#cfe8fc', width: '600px', height: '250px', justifyContent: 'center' }} > WEBSITE CONTACTS API <br /> Get well-structured domain owner contact information, including company name and key contacts with direct-dial phone numbers, email addresses, and social media links based on data parsed from website content, social networks, Secure Sockets Layer (SSL) certificates, and other sources. </Box>


      <Container maxWidth="xl">
        <Box style={{ marginTop: '30px' }} sx={{ bgcolor: '#cfe8fc', width: '100%', height: '500px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }} >
          <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '25%', height: '400px', }}>
            <div>Enter the Email to check</div>
            <input type="text" value={ip} onChange={handleChange} />
            <button onClick={handleClick}>Get Data</button>
          </Box>
          <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '65%', height: '400px' }}>
            <div>
              {/* <h1>{info.meta.title}</h1>
              <p>{info.meta.description}</p> */}
              <h2>Company Names:</h2>
              <ul>
                {info && info.companyNames && info.companyNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
              <h2>Country Code:</h2>
              <div>{info && info.countryCode}</div>
              <h2>Description:</h2>
              <div>{info && info.meta && info.meta.description}</div>
              <h2>Title:</h2>
              <div>{info && info.meta && info.meta.title}</div>
              <h2>Emails:</h2>
              <ul>
                {info &&  info.emails && info.emails.map((email, index) => (
                  <li key={index}>{email.email}</li>
                ))}
              </ul>
              <h2>Phone Numbers:</h2>
              <ul>
                {info && info.phones&& info.phones.map((phone, index) => (
                  <li key={index}>
                    {phone.phoneNumber} - {phone.callHours}
                  </li>
                ))}
              </ul>
              <h2>Domain Name:</h2>
              <p>{info && info.domainName}</p>
              {/* Render other data as needed */}
            </div>

          </Box>
        </Box>
      </Container>

    </>
  )
}
