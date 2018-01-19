import passwd from "../passwd";
import airports from "../flightapi/airports";
import OpenWeather from "./OpenWeather";

function retrieveForecast(lat, lon, time, callback)
{
    let o = new OpenWeather(passwd.openWeatherKey);
    o.forecast(lat, lon, (err, r) => {
        if (err) {
            let message = `ScheduledFlightDetailPanel: error retrieving forecast for (${lat},${lon}) and time '${time}': ${JSON.stringify(err, null, 2)}`;
            console.log(message);
            callback(undefined, Error(message));
        }
        else {
            let ret = r.reduce((acc, value) => Math.abs(value.dt - time) < Math.abs(acc.dt - time) ? value : acc);
            callback(ret);
        }
    });

}

const getFlightWeather = function(origin, destination, departureTime, arrivalTime, callback) {
    let originAirport = airports[origin];
    retrieveForecast(originAirport.lat, originAirport.lon, departureTime, (or, oe) => {
        let destinationAirport = airports[destination];
        retrieveForecast(destinationAirport.lat, destinationAirport.lon, arrivalTime, (dr, de) => {
            callback({destinationWeather: dr, originWeather: or});
        });
    });
};

export default getFlightWeather;