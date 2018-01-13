import FlightAware from './FlightAware';

let f = new FlightAware();

f.setCredentials('', '');
f.AllAirports((err, r) => {
   console.log(JSON.stringify(r));
});