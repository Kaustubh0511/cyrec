import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Emailver() {

  const [ip, setIp] = useState('');
  const [info, SetInfo] = useState(null);

  const handleChange = (e) => {
    setIp(e.target.value);
  }

  let API_URL = `https://subdomains.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domainName=${ip}`;
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
      <Box style={{ marginTop: '10px', padding: '25px' }} sx={{ display: 'inline-flex', bgcolor: '#cfe8fc', width: '600px', height: '250px', justifyContent: 'center' }} > SUBDOMAINS
        API <br /> With one API call, instantly get a list of all subdomains related to a given domain name to reveal a company’s entire web infrastructure. Use it to identify and fortify potential vulnerabilities. </Box>


      <Container maxWidth="xl">
        <Box style={{ marginTop: '30px' }} sx={{ bgcolor: '#cfe8fc', width: '100%', height: '500px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }} >
          <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '25%', height: '400px', }}>
            <div>Enter the Domain to check</div>
            <input type="text" value={ip} onChange={handleChange} />
            <button onClick={handleClick}>Get Data</button>
          </Box>
          <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '65%', height: '400px' }}>
            <div>
              <div>Search: {info && info.search}</div>
              <div>Subdomains Count: {info && info.result &&  info.result.count}</div>
              <ul>
                {info && info.result && info.result.records && info.result.records.slice(0,10).map((record, index) => (
                  <li key={index}>
                    <strong>Domain:</strong> {record.domain}<br />
                    <strong>First Seen:</strong> {record.firstSeen}<br />
                    <strong>Last Seen:</strong> {record.lastSeen}
                  </li>
                ))}
              </ul>
            </div>

          </Box>
        </Box>
      </Container>

    </>
  )
}
