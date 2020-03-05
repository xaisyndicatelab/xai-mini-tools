const fetch = require('node-fetch');
const oalah = require('../lib/Helper').randomAgent();
const axios = require('axios');
module.exports = {
    Alexa: (domain) => {
        axios({
            method: 'GET',
            url: `http://data.alexa.com/data?cli=10&dat=snbamz&url=${domain}`,
            headers: {
                'User-Agent': oalah
            }
        }).then((res) => {
            if (res.data.match("<POPULARITY")) {
                const egexna = /<REACH RANK="([0-9]+)"/gm;
                const egexgl = /<COUNTRY CODE="([A-Z]+)" NAME="(.*)" RANK="([0-9]+)"/gm;
                const global = egexna.exec(res.data);
                const local = egexgl.exec(res.data);
                console.log("URL            : " + domain);
                console.log("GLOBAL RANK    : " + global[1]);
                console.log("LOCAL RANK     : " + local[3]);
                console.log("COUNTRY        : " + local[2]);
                console.log("COUNTRY CODE   : " + local[1]);
                console.log("");
            } else {
                console.log("URL            : " + domain);
                console.log("GLOBAL RANK    : -");
                console.log("LOCAL RANK     : -");
                console.log("COUNTRY        : -");
                console.log("COUNTRY CODE   : -")
                console.log("");
            }
        }).catch((err) => {
            console.log(err);
        })
    },
    SUBFINDER: (domain) => {
        const getData = (domains) => new Promise((resolver, reject) => {
            fetch(`https://api.rintod.dev/subdomain.php?domain=${domains}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(res => {
                resolver(res);
            })
            .catch((err) => {
                reject(err);
            })
        });

        (async () => {
            const data = await getData(domain);
            data.records.map(find => {
                console.log(find.hostname);
            });
        })();
    },
    DNSLOOKUP: (domain) => {
        const getData = (domains) => new Promise((resolver, reject) => {
            fetch(`https://api.rintod.dev/dnslookup.php?domain=${domains}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(res => {
                resolver(res);
            })
            .catch(err => {
                reject(err);
            })
        });

        (async () => {
            const data = await getData(domain);
            data.DNSData.dnsRecords.map(lookup => {
                console.log(lookup.rawText);
            });
        })();
    },
    WPBF: (login, user, pass) => new Promise((resolver, reject) => {
        var data = `<?xml version=\"1.0\"?><methodCall>
        <methodName>wp.getUsersBlogs</methodName>
        <params>
        <param><value>${user}</value></param>
        <param><value>${pass}</value></param>
        </params>
        </methodCall>`;
        var config = {
            headers: {
                'User-Agent': oalah
            }
        }
        axios.post(login, data, config)
        .then((res) => {
            resolver(res.data);
        })
        .catch((err) => {
            reject(err)
        })
    })
}