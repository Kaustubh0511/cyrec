import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';



export default function Geoloc() {

    const [ip,setIp] = useState('');
    // const [domain,setDomain] = useState('');
    const [info, SetInfo] = useState(null);

    const handleChange = (e) =>{
        setIp(e.target.value);
    }

    const chk = (ip) => {
        if(ip[0] >= '0' && ip[0] <= '9'){
            return true;
        }
        return false;
    }

    let API_URL = '';
    const handleClick = async () =>{
        if(chk(ip)){
            API_URL = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ip}`;
        }
        else{
            API_URL = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domain=${ip}`;
        }
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
            <Box style={{ marginTop: '10px', padding: '25px' }} sx={{ display: 'inline-flex', bgcolor: '#cfe8fc', width: '600px', height: '250px', justifyContent: 'center' }} > GEOLOCATION
                API <br /> geolocation APIs are a way for users to gather IP location data from geolocation databases via an application programming interface (API). Developers can integrate APIs as a building block to already existing applications and systems using different programming languages. </Box>


            <Container maxWidth="xl">
                <Box style={{ marginTop: '30px' }} sx={{ bgcolor: '#cfe8fc', width: '100%', height: '500px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }} >
                    <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '25%', height: '400px', }}>
                        <div>Enter the IPv4 or domain name to get details</div>
                        <input type="text" value={ip} onChange={handleChange} />
                        <button onClick={handleClick}>Get Data</button>
                    </Box>
                    <Box sx={{ border: 'solid 2px red', bgcolor: '#cfe8fc', width: '65%', height: '400px' }}>
                        <div>IP Address : {info && info.ip} </div>
                        <div>Connection Type : {info && info.connectionType} </div>
                        <div>Route : {info && info.as && info.as.route} </div>
                        <div>Domain : {info && info.as && info.as.domain} </div>
                        <div>ISP (Internet Service Provider) : {info && info.isp} </div>
                        <div>Region : {info && info.location.region} </div>
                        <div>City : {info && info.location.city} </div>
                        <div>Country : {info && info.location.country} </div>
                        <div>Longitude : {info && info.location.lng} </div>
                        <div>Latitude : {info && info.location.lat} </div>
                        <div>Timezone : {info && info.location.timezone} </div>
                    </Box>
                </Box>
            </Container>

        </>
    )
}
