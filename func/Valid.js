const net = require('net');
const colors = require('colors');
const fs = require('async-file');
const axios = require('axios');
const iyadeh = require('../lib/Helper').randomAgent();
const fetch = require('node-fetch');
// const request = require('request');
// const querystring = require('querystring');
var jar;
module.exports = {
    Gmail: (email) => {
        const socket = net.createConnection(25, "gmail-smtp-in.l.google.com");
        socket.write("EHLO rintod.dev\r\n");
        socket.write("MAIL FROM: <rintod@rintod.dev>\r\n");
        socket.write("RCPT TO: <" + email + ">\r\n");
        socket.on('data', buf => {
            const res = buf.toString();
            if (res.includes('250 2.1.5 OK')) {
                console.log(colors.bgGreen(colors.black(colors.bold(email))));
                fs.appendFile("result/gmail.txt", `${email}\n`, 'utf8');
            } else if (res.includes('550-5.1.1 The email account')) {
                console.log(colors.bgRed(colors.black(colors.bold(email))));
            }
            socket.end();
        });
    },
    Spotify: (email) => {
        axios({
            method: "GET",
            url: `https://www.spotify.com/id/xhr/json/isEmailAvailable.php?email=${email}`,
            headers: {
                "User-Agent": iyadeh
            }
        })
        .then(res => {
            if (res.data) {
                console.log(`${colors.bgRed(colors.bold(email))}`);
            }
            else {
                console.log(`${colors.bgGreen(colors.bold(email))}`);
                fs.appendFile("result/spotify.txt", `${email}\n`, 'utf8');
            }
        })
    },
    Twitter: (email) => {
        fetch(`https://twitter.com/users/email_available?email=${email}`, {
            method: 'GET',
            headers: {
                'User-Agent': iyadeh
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.taken) {
                console.log(`${colors.bgGreen(colors.bold(email))}`);
                fs.appendFile("result/twitter.txt", `${email}\n`, 'utf8');
            }
            else {
                console.log(`${colors.bgRed(colors.bold(email))}`);
            }
        })
    }
} 