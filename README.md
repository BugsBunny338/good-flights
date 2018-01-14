# Overview

This is GoodFlight demo. This code requires the 
[GoodFlights Demo project](https://secure.gooddata.com/gdc/projects/ljh2d3as9i2uw2jqrgcdgu3sl69j5wf0)

# Installation

```$bash
yarn install
```
Add OpenWeather and FlightAware API tokens to ```good-flights/src/passwd.js```
```$javascript
let passwd = {
    flightAwareApiUser : "flightaware-user",
    flightAwareApiKey : "flightaware-api-token",
    openWeatherKey: "openweather-api-token"
};
export default passwd;
```

# Running

```$bash
 HTTPS=true yarn start
```

# Development

Add the ```src/.gdcatalogrc``` file with following content

```$json
{
    "hostname": "https://secure.gooddata.com",
    "username": "your-gd-username@gooddata.com",
    "password": "your-gd-password",
    "projectId": "ljh2d3as9i2uw2jqrgcdgu3sl69j5wf0",
    "output": "catalog.json"
}
```

Refresh the catalog 

```$bash
gdc-catalog-export
```
