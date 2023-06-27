import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Emailver() {
  const [ip, setIp] = useState("");
  const [info, SetInfo] = useState(null);

  const handleChange = (e) => {
    setIp(e.target.value);
  };

  let API_URL = `https://subdomains.whoisxmlapi.com/api/v1?apiKey=at_mpgHtw2z1PN1o2ZdlrH8wLvcHho3n&domainName=${ip}`;
  const handleClick = async () => {
    await fetch(API_URL)
      .then(async (data) => {
        let k = await data.json();
        console.log(k);
        SetInfo(k);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Box className="bg-[#000000] text-slate-100">
        <Box >
          <h1 class="text-xl font-bold mb-2"> SUBDOMAINS API</h1>
          <br />{" "}
          <p>
            {" "}
            With one API call, instantly get a list of all subdomains related to
            a given domain name to reveal a company’s entire web infrastructure.
            Use it to identify and fortify potential vulnerabilities.{" "}
          </p>
        </Box>

        <Container maxWidth="xl">
          <Box className="flex justify-center items-center mt-8 mb-3">
            <Box className="bg-[#e57e17] text-white p-8 rounded-lg shadow-lg w-[50rem]">
              <div className="font-mono mb-2">Enter the Domain to check</div>
              <input
                type="text"
                value={ip}
                onChange={handleChange}
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md px-4 py-2 text-black mb-3"
              />
              <button
                className="ml-3 bg-blue-200 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded"
                onClick={handleClick}
              >
                Get Data
              </button>
            </Box>
          </Box>
          <Box className="flex-wrap">
            <div>
              <div>Search: {info && info.search}</div>
              <div>
                Subdomains Count: {info && info.result && info.result.count}
              </div>
              <ul>
                {info &&
                  info.result &&
                  info.result.records &&
                  info.result.records.slice(0, 10).map((record, index) => (
                    <li key={index}>
                      <strong>Domain:</strong> {record.domain}
                      <br />
                      <strong>First Seen:</strong> {record.firstSeen}
                      <br />
                      <strong>Last Seen:</strong> {record.lastSeen}
                    </li>
                  ))}
              </ul>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
}
