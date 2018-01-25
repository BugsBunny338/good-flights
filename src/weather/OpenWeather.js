import request from 'request';
import cfg from '../config';


function OpenWeather(apiKey) {
    this.apiKey = apiKey;
}

OpenWeather.host = `${cfg.hostname}:${cfg.port}`;//"flightxml.flightaware.com";
OpenWeather.baseURI = "/data/2.5/";
OpenWeather.URL = "https://" + OpenWeather.host + OpenWeather.baseURI;


OpenWeather.prototype.setCredentials = function(apiKey) {
    this.apiKey = apiKey;
};

OpenWeather.prototype._request = function(method, data, callback) {
    let qs = {...data, appid: this.apiKey};
    request.get({
        uri : OpenWeather.URL + method,
        qs : qs,
        rejectUnauthorized : false,
    }, function(err, res, body) {
        if(err) {
            callback(err, null);
        }
        else {
            var code = res.statusCode;
            if(code !== 200) {
                switch(code) {
                    case 401:
                        callback({ error: "unauthorized", code: code, text: body });
                        break;
                    case 410:
                        callback({ error: "invalid request URI", code: code, text: body });
                        break;
                    default:
                        callback({ error: "bad request", code: code, text: body });
                        break;
                }
            }
            else {
                var results = null;
                var error = null;
                try {
                    var json = JSON.parse(body);
                    results = json.list;
                } catch(e) {
                    error = { error: e, text: body };
                }
                callback(error, results);
            }
        }
    });
};

OpenWeather.prototype.forecast = function(lat,lon, callback) {
    var query = { lat: lat, lon: lon, units: 'metric' };
    this._request("forecast", query, callback)
};

export default  OpenWeather;