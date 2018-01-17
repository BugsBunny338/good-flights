
/**
 *  Predictor for ARR_DELAY from model/5a5ddc7592fb563339000d50
 *  Predictive model by BigML - Machine Learning Made Easy
 */
export default function predictArr_delay(data) {
    if (data.origin_air_temp == null) {
        return 6.80453;
    }
    else if (data.origin_air_temp > 27) {
        if (data.origin_air_temp > 28) {
            if (data.dep_month == null) {
                return 24.2946;
            }
            else if (data.dep_month=="SEP") {
                return 9.40934;
            }
            else if (data.dep_month!="SEP") {
                if (data.origin == null) {
                    return 26.42162;
                }
                else if (data.origin=="EWR") {
                    return 38.33673;
                }
                else if (data.origin!="EWR") {
                    return 23.8074;
                }
            }
        }
        else if (data.origin_air_temp <= 28) {
            if (data.origin_wind_dir == null) {
                return 13.43058;
            }
            else if (data.origin_wind_dir > 235) {
                return 6.81076;
            }
            else if (data.origin_wind_dir <= 235) {
                if (data.origin_wind_dir > 125) {
                    return 22.87284;
                }
                else if (data.origin_wind_dir <= 125) {
                    return 10.37697;
                }
            }
        }
    }
    else if (data.origin_air_temp <= 27) {
        if (data.dest_precipitation_3h == null) {
            return 5.35729;
        }
        else if (data.dest_precipitation_3h > 0) {
            if (data.dest == null) {
                return 22.68215;
            }
            else if (data.dest=="SFO") {
                return 36.84638;
            }
            else if (data.dest!="SFO") {
                if (data.dest_air_temp == null) {
                    return 19.07652;
                }
                else if (data.dest_air_temp > -7) {
                    if (data.dep_month == null) {
                        return 18.51361;
                    }
                    else if (data.dep_month=="FEB") {
                        return 39.07143;
                    }
                    else if (data.dep_month!="FEB") {
                        if (data.origin_precipitation_3h == null) {
                            return 16.28113;
                        }
                        else if (data.origin_precipitation_3h > 1) {
                            return 37.14363;
                        }
                        else if (data.origin_precipitation_3h <= 1) {
                            if (data.dest_air_temp > 11) {
                                if (data.dep_month=="DEC") {
                                    if (data.dest_pressure == null) {
                                        return 40.48047;
                                    }
                                    else if (data.dest_pressure > 1016) {
                                        return 12.12871;
                                    }
                                    else if (data.dest_pressure <= 1016) {
                                        return 58.95484;
                                    }
                                }
                                else if (data.dep_month!="DEC") {
                                    if (data.dest_pressure == null) {
                                        return 15.90913;
                                    }
                                    else if (data.dest_pressure > 1012) {
                                        return 11.11198;
                                    }
                                    else if (data.dest_pressure <= 1012) {
                                        return 22.43884;
                                    }
                                }
                            }
                            else if (data.dest_air_temp <= 11) {
                                if (data.origin_wind_speed == null) {
                                    return 8.69877;
                                }
                                else if (data.origin_wind_speed > 15) {
                                    return 147;
                                }
                                else if (data.origin_wind_speed <= 15) {
                                    return 8.45614;
                                }
                            }
                        }
                    }
                }
                else if (data.dest_air_temp <= -7) {
                    return 115.09677;
                }
            }
        }
        else if (data.dest_precipitation_3h <= 0) {
            return 5.02736;
        }
    }
    return null;
}