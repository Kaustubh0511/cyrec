import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Emailver ()  {

    const [ip,setIp] = useState('');
    const [info, SetInfo] = useState(null);
    
    const handleChange = (e) =>{
        setIp(e.target.value);
    }

    let API_URL = `https://emailverification.whoisxmlapi.com/api/v2?apiKey=${process.env.REACT_APP_EMAILVER_API_KEY}&emailAddress=${ip}`;
    const handleClick = async () =>{
        await fetch(API_URL)
            .then( async (data) => {
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
            <Box style={{ marginTop: '10px', padding: '25px' }} sx={{ display: 'inline-flex', bgcolor: '#cfe8fc', width: '600px', height: '250px', justifyContent: 'center' }} > EMAIL VERIFICATION
                API <br /> An email verification API, also known as an email validation API, is a means for developers and product architects to integrate email checking capabilities into existing software and applications via API calls using different programming languages. </Box>


            <Container maxWidth="xl">
                <Box style={{ marginTop: '30px' }} sx={{ bgcolor: '#cfe8fc', width: '100%', height: '500px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }} >
                    <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '25%', height: '400px', }}>
                        <div>Enter the Email to check</div>
                        <input type="text" value={ip} onChange={handleChange} />
                        <button onClick={handleClick}>Get Data</button>
                    </Box>
                    <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '65%', height: '400px' }}>
                        <div>Username : {info && info.username} </div>
                        <div>Domain : {info && info.domain} </div>
                        <div>emial Address : {info && info.emailAddress} </div>
                        <div>Format Check : {info && info.formatCheck} </div>
                        <div>SMTP Check : {info && info.smtpCheck} </div>
                        <div>DNS Check : {info && info.dnsCheck} </div>
                        <div>All Checks : {info && info.catchAllCheck} </div>
                        <div>Audit Created Date : {info && info.audit && info.audit.auditCreatedDate} </div>
                         <div>MX Records: {info && info.mxRecords && info.mxRecords.map((e,i) => 
                            <div key={i}> {"-"} {e}</div>
                        )}
                        </div>
                        
                    </Box>
                </Box>
            </Container>

        </>
  )
}
