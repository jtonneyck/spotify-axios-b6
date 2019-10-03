const express = require("express")
const app = express()
const axios = require("axios")
const qs = require("qs")
const btoa = require("btoa")
require('dotenv').config()
const clientId = process.env.clientId // do not push your clientId and secret to gitHub. Use a .env file
const clientSecret = process.env.clientSecret // you can get your clientId and secret by registering your app on https://developer.spotify.com
var access_token = "" // will be retrieved in step A

/* STEP A: exchanging clientId and clientSecret for an access token */

/* https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow */
axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": 'Basic ' + btoa(clientId + ':' + clientSecret) 
    },
    data: qs.stringify({
        grant_type: "client_credentials",
        client_id: clientId
    })
})
.then((response)=> {
    access_token = response.data.access_token
})
.catch((err)=> {
    debugger
})
/* End exchanging clientId and clientSecret for an access token */

/* STEP B: query the Spotify API using the access_token retrieved in step A */

app.get("/search", (req,res)=> {
    /*https://developer.spotify.com/documentation/web-api/reference/search/search/ */
    axios({
        method: "GET",
        headers: {Authorization:`Bearer ${access_token}`},
        url: `https://api.spotify.com/v1/search`,
        params: {
            type: "artist",
            q: "prince"
        }

    })
    .then((response)=> {
        debugger
    })
    .catch((err)=> {
        debugger
    })
})
/*End STEP B*/


app.listen(3000)