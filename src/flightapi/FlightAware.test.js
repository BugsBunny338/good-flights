import FlightAware from './FlightAware';
import passwd from '../passwd';

let f = new FlightAware();

f.setCredentials(passwd.flightAwareApiUser, passwd.flightAwareApiKey);

f.Scheduled({airport: 'PSP', filter: 'airline'}, (err, r) => {
    console.log(JSON.stringify(r,null,2));
});
//VX56
//B6150

/*
var utcSeconds = 1234567890;
var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
d.setUTCSeconds(utcSeconds);
 */