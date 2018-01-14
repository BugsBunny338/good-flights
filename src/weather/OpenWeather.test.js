import passwd from "../passwd";
import OpenWeather from "./OpenWeather";

let o = new OpenWeather(passwd.openWeatherKey);
o.forecast(42.36429977,-71.00520325, (e,r) => {
    console.log(JSON.stringify(r, null,2));
});