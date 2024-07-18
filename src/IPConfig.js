import React from "react";


const IpAddress = () => {
    // var IP = "http://127.0.0.1:8000/";
    var IP = "http://localhost:3000/";

    let url = window.location.hostname;

    if (url.includes("10.101.104.140")) {
        IP = "http://10.101.104.140:5053/";
    }

    return IP;
}

export default IpAddress;
