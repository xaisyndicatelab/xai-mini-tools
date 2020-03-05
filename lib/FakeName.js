const fetch = require('node-fetch')

module.exports = {
    GetData: () => new Promise((resolver, reject) => {
        fetch('https://api.randomuser.me/', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            resolver(res);
        })
        .catch(err => {
            reject(err);
        })
    }),

   Data: async function() {
       var data = await this.GetData();
       var fakes;
       data.results.map(fake => {
           fakes = {
               gender: fake.gender,
               name: {
                   title: fake.name.title,
                   first: fake.name.first,
                   last: fake.name.last
               },
               location: {
                   street: {
                       number: fake.location.street.number,
                       name: fake.location.street.name
                   },
                   city: fake.location.city,
                   state: fake.location.state,
                   country: fake.location.country,
                   postcode: fake.location.postcode,
                   coordinates: {
                       latitude: fake.location.coordinates.latitude,
                       longitude: fake.location.coordinates.longitude
                   },
                   timezone: {
                       offset: fake.location.timezone.offset,
                       description: fake.location.timezone.description
                   }
               },
               email: fake.email,
               login: {
                   uuid: fake.login.uuid,
                   username: fake.login.username,
                   password: fake.login.password,
               },
               dob: {
                   date: fake.dob.date,
                   age: fake.dob.age
               },
               phone: fake.phone
           }
       });
       return fakes;
   }
}