import predict from './model';

let inputData = {
    "crs_dep_time_bucket": "M",
    "dest_precipitation_3h": 1,
    "duration_bucket": "L",
    "crs_arr_time_bucket": "e",
    "dest_pressure": 1,
    "dest_air_temp": 1,
    "dest_wind_speed": 1,
    "dest_wind_dir": 1,
    "origin_precipitation_3h": 1,
    "origin_wind_dir": 1,
    "origin_wind_speed": 1,
    "origin_air_temp": 1,
    "origin_pressure": 1,
    "dest_size": "XXL",
    "dest_state": "CA",
    "dep_date_holidays": "C",
    "dest": "LAX",
    "origin_state": "CA",
    "carrier": "UAL",
    "origin": "LAX",
    "dep_month": "AUG",
    "dep_day_of_week": "THY",
    "arr_date_holidays": "C",
    "origin_size": "XXL"
};

console.log(predict(inputData));



