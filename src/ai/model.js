
/**
 *  Predictor for ARR_DELAY from model/5a61e04692fb567c53000a97
 *  Predictive model by BigML - Machine Learning Made Easy
 */
const predictDelay = function (data) {
    if (data.crs_arr_time_bucket === null) {
        return 7.27033;
    }
    else if (data.crs_arr_time_bucket==="E") {
        if (data.dest_precipitation_3h === null) {
            return 14.01034;
        }
        else if (data.dest_precipitation_3h > 1) {
            if (data.duration_bucket === null) {
                return 38.13323;
            }
            else if (data.duration_bucket==="S") {
                return 65.63067;
            }
            else if (data.duration_bucket!=="S") {
                return 29.17382;
            }
        }
        else if (data.dest_precipitation_3h <= 1) {
            if (data.origin_air_temp === null) {
                return 13.29412;
            }
            else if (data.origin_air_temp > 28) {
                if (data.origin_state === null) {
                    return 24.33123;
                }
                else if (data.origin_state==="NJ") {
                    return 36.72141;
                }
                else if (data.origin_state!=="NJ") {
                    if (data.dep_month === null) {
                        return 21.73102;
                    }
                    else if (data.dep_month==="SEP") {
                        return 9.1;
                    }
                    else if (data.dep_month!=="SEP") {
                        if (data.dep_day_of_week === null) {
                            return 23.56069;
                        }
                        else if (data.dep_day_of_week==="TUE") {
                            return 11.74086;
                        }
                        else if (data.dep_day_of_week!=="TUE") {
                            if (data.origin_state==="NY") {
                                return 36.29652;
                            }
                            else if (data.origin_state!=="NY") {
                                if (data.dest_state === null) {
                                    return 23.08537;
                                }
                                else if (data.dest_state==="NY") {
                                    return 36.15617;
                                }
                                else if (data.dest_state!=="NY") {
                                    if (data.carrier === null) {
                                        return 20.87159;
                                    }
                                    else if (data.carrier==="FFT") {
                                        return 44.69792;
                                    }
                                    else if (data.carrier!=="FFT") {
                                        if (data.origin_air_temp > 33) {
                                            return 31.58607;
                                        }
                                        else if (data.origin_air_temp <= 33) {
                                            return 18.42565;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (data.origin_air_temp <= 28) {
                if (data.origin_pressure === null) {
                    return 12.12051;
                }
                else if (data.origin_pressure > 1016) {
                    if (data.dep_month === null) {
                        return 8.66248;
                    }
                    else if (data.dep_month==="DEC") {
                        if (data.origin_air_temp > -15) {
                            if (data.dest_air_temp === null) {
                                return 14.08502;
                            }
                            else if (data.dest_air_temp > -16) {
                                if (data.dest_state === null) {
                                    return 13.65629;
                                }
                                else if (data.dest_state==="CA") {
                                    return 18.88278;
                                }
                                else if (data.dest_state!=="CA") {
                                    return 10.27316;
                                }
                            }
                            else if (data.dest_air_temp <= -16) {
                                return 98.4375;
                            }
                        }
                        else if (data.origin_air_temp <= -15) {
                            return 85.16667;
                        }
                    }
                    else if (data.dep_month!=="DEC") {
                        if (data.origin_pressure > 1020) {
                            if (data.origin_air_temp > -2) {
                                if (data.dest_wind_speed === null) {
                                    return 4.29481;
                                }
                                else if (data.dest_wind_speed > 7) {
                                    return 10.60366;
                                }
                                else if (data.dest_wind_speed <= 7) {
                                    if (data.dest_state === null) {
                                        return 3.13628;
                                    }
                                    else if (data.dest_state==="VA") {
                                        return -4.30853;
                                    }
                                    else if (data.dest_state!=="VA") {
                                        return 3.60285;
                                    }
                                }
                            }
                            else if (data.origin_air_temp <= -2) {
                                return 19.37008;
                            }
                        }
                        else if (data.origin_pressure <= 1020) {
                            if (data.dest_pressure === null) {
                                return 10.00106;
                            }
                            else if (data.dest_pressure > 1020) {
                                if (data.origin_precipitation_3h === null) {
                                    return 4.04505;
                                }
                                else if (data.origin_precipitation_3h > 1) {
                                    if (data.duration_bucket === null) {
                                        return 40.09091;
                                    }
                                    else if (data.duration_bucket==="S") {
                                        return 93.375;
                                    }
                                    else if (data.duration_bucket!=="S") {
                                        return 18.23077;
                                    }
                                }
                                else if (data.origin_precipitation_3h <= 1) {
                                    return 3.18233;
                                }
                            }
                            else if (data.dest_pressure <= 1020) {
                                if (data.dep_month==="MAR") {
                                    return 19.65909;
                                }
                                else if (data.dep_month!=="MAR") {
                                    if (data.dep_month==="JUN") {
                                        return 20.50123;
                                    }
                                    else if (data.dep_month!=="JUN") {
                                        if (data.dep_month==="JUL") {
                                            return 18.09419;
                                        }
                                        else if (data.dep_month!=="JUL") {
                                            if (data.dep_month==="AUG") {
                                                return 15.65458;
                                            }
                                            else if (data.dep_month!=="AUG") {
                                                return 7.51707;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if (data.origin_pressure <= 1016) {
                    if (data.duration_bucket === null) {
                        return 15.24853;
                    }
                    else if (data.duration_bucket==="S") {
                        if (data.origin_precipitation_3h === null) {
                            return 21.53157;
                        }
                        else if (data.origin_precipitation_3h > 0) {
                            if (data.origin_air_temp > 1) {
                                return 48.39936;
                            }
                            else if (data.origin_air_temp <= 1) {
                                if (data.origin_pressure > 1012) {
                                    return 228.88889;
                                }
                                else if (data.origin_pressure <= 1012) {
                                    return 45.25;
                                }
                            }
                        }
                        else if (data.origin_precipitation_3h <= 0) {
                            if (data.dep_day_of_week === null) {
                                return 19.9882;
                            }
                            else if (data.dep_day_of_week==="THU") {
                                if (data.dep_month === null) {
                                    return 32.29429;
                                }
                                else if (data.dep_month==="SEP") {
                                    return 4.16981;
                                }
                                else if (data.dep_month!=="SEP") {
                                    return 35.51025;
                                }
                            }
                            else if (data.dep_day_of_week!=="THU") {
                                if (data.dep_day_of_week==="SAT") {
                                    if (data.dep_month === null) {
                                        return 31.65569;
                                    }
                                    else if (data.dep_month==="FEB") {
                                        return -0.85185;
                                    }
                                    else if (data.dep_month!=="FEB") {
                                        return 33.50738;
                                    }
                                }
                                else if (data.dep_day_of_week!=="SAT") {
                                    if (data.dep_day_of_week==="WED") {
                                        return 24.44158;
                                    }
                                    else if (data.dep_day_of_week!=="WED") {
                                        if (data.dest_precipitation_3h > 0) {
                                            return 75.42105;
                                        }
                                        else if (data.dest_precipitation_3h <= 0) {
                                            if (data.origin_wind_dir === null) {
                                                return 11.66483;
                                            }
                                            else if (data.origin_wind_dir > 215) {
                                                return 9.06796;
                                            }
                                            else if (data.origin_wind_dir <= 215) {
                                                return 16.86716;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (data.duration_bucket!=="S") {
                        if (data.dep_month === null) {
                            return 13.05226;
                        }
                        else if (data.dep_month==="JUN") {
                            if (data.origin_state === null) {
                                return 22.233;
                            }
                            else if (data.origin_state==="NJ") {
                                if (data.origin_wind_dir === null) {
                                    return 39.96209;
                                }
                                else if (data.origin_wind_dir > 175) {
                                    return 15.54472;
                                }
                                else if (data.origin_wind_dir <= 175) {
                                    return 74.09091;
                                }
                            }
                            else if (data.origin_state!=="NJ") {
                                if (data.dest_air_temp === null) {
                                    return 20.5099;
                                }
                                else if (data.dest_air_temp > 23) {
                                    return 15.30435;
                                }
                                else if (data.dest_air_temp <= 23) {
                                    return 25.89597;
                                }
                            }
                        }
                        else if (data.dep_month!=="JUN") {
                            if (data.dep_month==="JUL") {
                                if (data.dep_day_of_week === null) {
                                    return 20.67526;
                                }
                                else if (data.dep_day_of_week==="MON") {
                                    return 1.22677;
                                }
                                else if (data.dep_day_of_week!=="MON") {
                                    return 23.88289;
                                }
                            }
                            else if (data.dep_month!=="JUL") {
                                if (data.dep_month==="AUG") {
                                    if (data.dest_size === null) {
                                        return 19.5419;
                                    }
                                    else if (data.dest_size==="XXL") {
                                        return 27.48936;
                                    }
                                    else if (data.dest_size!=="XXL") {
                                        return 11.74453;
                                    }
                                }
                                else if (data.dep_month!=="AUG") {
                                    if (data.dest_air_temp === null) {
                                        return 9.53448;
                                    }
                                    else if (data.dest_air_temp > -2) {
                                        if (data.origin_precipitation_3h === null) {
                                            return 9.09214;
                                        }
                                        else if (data.origin_precipitation_3h > 0) {
                                            return 19.10348;
                                        }
                                        else if (data.origin_precipitation_3h <= 0) {
                                            if (data.dest === null) {
                                                return 8.29866;
                                            }
                                            else if (data.dest==="SFO") {
                                                if (data.dest_pressure === null) {
                                                    return 13.90763;
                                                }
                                                else if (data.dest_pressure > 1007) {
                                                    if (data.dep_month==="OCT") {
                                                        return 30.34874;
                                                    }
                                                    else if (data.dep_month!=="OCT") {
                                                        if (data.dep_month==="NOV") {
                                                            return -1.80786;
                                                        }
                                                        else if (data.dep_month!=="NOV") {
                                                            return 12.83138;
                                                        }
                                                    }
                                                }
                                                else if (data.dest_pressure <= 1007) {
                                                    if (data.carrier === null) {
                                                        return 70.66667;
                                                    }
                                                    else if (data.carrier==="VRD") {
                                                        return 159.33333;
                                                    }
                                                    else if (data.carrier!=="VRD") {
                                                        return 48.5;
                                                    }
                                                }
                                            }
                                            else if (data.dest!=="SFO") {
                                                if (data.origin_wind_speed === null) {
                                                    return 7.00863;
                                                }
                                                else if (data.origin_wind_speed > 13) {
                                                    return 40.125;
                                                }
                                                else if (data.origin_wind_speed <= 13) {
                                                    return 6.87964;
                                                }
                                            }
                                        }
                                    }
                                    else if (data.dest_air_temp <= -2) {
                                        return 36.8018;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if (data.crs_arr_time_bucket!=="E") {
        if (data.crs_dep_time_bucket === null) {
            return 3.42136;
        }
        else if (data.crs_dep_time_bucket==="M") {
            if (data.dest_state === null) {
                return 0.91309;
            }
            else if (data.dest_state==="CA") {
                if (data.duration_bucket === null) {
                    return 4.33274;
                }
                else if (data.duration_bucket==="L") {
                    if (data.dep_month === null) {
                        return 0.48056;
                    }
                    else if (data.dep_month==="DEC") {
                        if (data.origin_air_temp === null) {
                            return 17.72687;
                        }
                        else if (data.origin_air_temp > -2) {
                            return 14.28429;
                        }
                        else if (data.origin_air_temp <= -2) {
                            if (data.origin_precipitation_3h === null) {
                                return 42.08824;
                            }
                            else if (data.origin_precipitation_3h > 1) {
                                return 210.88889;
                            }
                            else if (data.origin_precipitation_3h <= 1) {
                                return 32.65217;
                            }
                        }
                    }
                    else if (data.dep_month!=="DEC") {
                        if (data.dest_precipitation_3h === null) {
                            return -1.21882;
                        }
                        else if (data.dest_precipitation_3h > 1) {
                            return 15.50183;
                        }
                        else if (data.dest_precipitation_3h <= 1) {
                            if (data.origin_air_temp === null) {
                                return -1.55296;
                            }
                            else if (data.origin_air_temp > 20) {
                                return 2.06317;
                            }
                            else if (data.origin_air_temp <= 20) {
                                if (data.dep_month==="OCT") {
                                    return 3.81332;
                                }
                                else if (data.dep_month!=="OCT") {
                                    if (data.dest_pressure === null) {
                                        return -4.11249;
                                    }
                                    else if (data.dest_pressure > 1003) {
                                        if (data.dest_pressure > 1028) {
                                            return 26.61225;
                                        }
                                        else if (data.dest_pressure <= 1028) {
                                            return -4.41221;
                                        }
                                    }
                                    else if (data.dest_pressure <= 1003) {
                                        if (data.carrier === null) {
                                            return 77.83333;
                                        }
                                        else if (data.carrier==="VRD") {
                                            return 159.8;
                                        }
                                        else if (data.carrier!=="VRD") {
                                            return 19.28571;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if (data.duration_bucket!=="L") {
                    if (data.dest_precipitation_3h === null) {
                        return 8.93401;
                    }
                    else if (data.dest_precipitation_3h > 0) {
                        return 33.17114;
                    }
                    else if (data.dest_precipitation_3h <= 0) {
                        if (data.crs_arr_time_bucket==="A") {
                            if (data.dest_pressure === null) {
                                return 13.46776;
                            }
                            else if (data.dest_pressure > 1007) {
                                if (data.origin_air_temp === null) {
                                    return 13.08797;
                                }
                                else if (data.origin_air_temp > -16) {
                                    return 12.95086;
                                }
                                else if (data.origin_air_temp <= -16) {
                                    return 151.66667;
                                }
                            }
                            else if (data.dest_pressure <= 1007) {
                                return 71.1;
                            }
                        }
                        else if (data.crs_arr_time_bucket!=="A") {
                            return 6.68283;
                        }
                    }
                }
            }
            else if (data.dest_state!=="CA") {
                if (data.crs_arr_time_bucket==="A") {
                    if (data.dest_air_temp === null) {
                        return 0.68774;
                    }
                    else if (data.dest_air_temp > 29) {
                        return 8.77795;
                    }
                    else if (data.dest_air_temp <= 29) {
                        if (data.dest_state==="CO") {
                            if (data.carrier === null) {
                                return 4.74721;
                            }
                            else if (data.carrier==="UAL") {
                                return 0.14425;
                            }
                            else if (data.carrier!=="UAL") {
                                return 8.86477;
                            }
                        }
                        else if (data.dest_state!=="CO") {
                            if (data.carrier === null) {
                                return -0.70575;
                            }
                            else if (data.carrier==="AAL") {
                                return 3.34389;
                            }
                            else if (data.carrier!=="AAL") {
                                if (data.dest_state==="NJ") {
                                    if (data.origin_air_temp === null) {
                                        return 1.49847;
                                    }
                                    else if (data.origin_air_temp > -16) {
                                        return 1.31776;
                                    }
                                    else if (data.origin_air_temp <= -16) {
                                        return 82.25;
                                    }
                                }
                                else if (data.dest_state!=="NJ") {
                                    return -3.35381;
                                }
                            }
                        }
                    }
                }
                else if (data.crs_arr_time_bucket!=="A") {
                    if (data.carrier === null) {
                        return -4.71985;
                    }
                    else if (data.carrier==="AAL") {
                        return -0.03865;
                    }
                    else if (data.carrier!=="AAL") {
                        if (data.dest_air_temp === null) {
                            return -6.02833;
                        }
                        else if (data.dest_air_temp > -15) {
                            return -6.16746;
                        }
                        else if (data.dest_air_temp <= -15) {
                            if (data.origin_pressure === null) {
                                return 52.25;
                            }
                            else if (data.origin_pressure > 1022) {
                                return 136.88889;
                            }
                            else if (data.origin_pressure <= 1022) {
                                return 12.15789;
                            }
                        }
                    }
                }
            }
        }
        else if (data.crs_dep_time_bucket!=="M") {
            if (data.crs_dep_time_bucket==="N") {
                if (data.duration_bucket === null) {
                    return -3.96294;
                }
                else if (data.duration_bucket==="L") {
                    return 5.34578;
                }
                else if (data.duration_bucket!=="L") {
                    return -6.81922;
                }
            }
            else if (data.crs_dep_time_bucket!=="N") {
                if (data.origin_precipitation_3h === null) {
                    return 7.95536;
                }
                else if (data.origin_precipitation_3h > 1) {
                    if (data.origin_air_temp === null) {
                        return 25.49474;
                    }
                    else if (data.origin_air_temp > 1) {
                        return 22.07972;
                    }
                    else if (data.origin_air_temp <= 1) {
                        if (data.duration_bucket === null) {
                            return 74.14815;
                        }
                        else if (data.duration_bucket==="M") {
                            return 21.97674;
                        }
                        else if (data.duration_bucket!=="M") {
                            if (data.origin_state === null) {
                                return 133.18421;
                            }
                            else if (data.origin_state==="NY") {
                                return 201.30769;
                            }
                            else if (data.origin_state!=="NY") {
                                return 97.76;
                            }
                        }
                    }
                }
                else if (data.origin_precipitation_3h <= 1) {
                    if (data.origin_air_temp === null) {
                        return 7.31085;
                    }
                    else if (data.origin_air_temp > 26) {
                        if (data.origin_state === null) {
                            return 14.2278;
                        }
                        else if (data.origin_state==="VA") {
                            return -0.46216;
                        }
                        else if (data.origin_state!=="VA") {
                            if (data.dep_month === null) {
                                return 15.5873;
                            }
                            else if (data.dep_month==="OCT") {
                                return 0.14029;
                            }
                            else if (data.dep_month!=="OCT") {
                                if (data.dep_month==="SEP") {
                                    return 6.49905;
                                }
                                else if (data.dep_month!=="SEP") {
                                    if (data.origin_wind_dir === null) {
                                        return 18.43967;
                                    }
                                    else if (data.origin_wind_dir > 285) {
                                        return 6.90448;
                                    }
                                    else if (data.origin_wind_dir <= 285) {
                                        if (data.origin_wind_dir > 125) {
                                            return 23.9189;
                                        }
                                        else if (data.origin_wind_dir <= 125) {
                                            return 14.78372;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (data.origin_air_temp <= 26) {
                        if (data.origin_pressure === null) {
                            return 6.71255;
                        }
                        else if (data.origin_pressure > 1015) {
                            if (data.dest_precipitation_3h === null) {
                                return 4.51101;
                            }
                            else if (data.dest_precipitation_3h > 0) {
                                return 19.61931;
                            }
                            else if (data.dest_precipitation_3h <= 0) {
                                if (data.dep_month === null) {
                                    return 3.94538;
                                }
                                else if (data.dep_month==="DEC") {
                                    if (data.dest_state === null) {
                                        return 10.56777;
                                    }
                                    else if (data.dest_state==="CA") {
                                        return 16.931;
                                    }
                                    else if (data.dest_state!=="CA") {
                                        return 6.60524;
                                    }
                                }
                                else if (data.dep_month!=="DEC") {
                                    if (data.origin_state === null) {
                                        return 3.05397;
                                    }
                                    else if (data.origin_state==="CA") {
                                        if (data.crs_arr_time_bucket==="A") {
                                            if (data.origin_pressure > 1021) {
                                                return 1.91679;
                                            }
                                            else if (data.origin_pressure <= 1021) {
                                                return 10.79925;
                                            }
                                        }
                                        else if (data.crs_arr_time_bucket!=="A") {
                                            return 2.74681;
                                        }
                                    }
                                    else if (data.origin_state!=="CA") {
                                        if (data.origin_air_temp > 23) {
                                            return 6.27557;
                                        }
                                        else if (data.origin_air_temp <= 23) {
                                            return -0.45661;
                                        }
                                    }
                                }
                            }
                        }
                        else if (data.origin_pressure <= 1015) {
                            if (data.origin_wind_dir === null) {
                                return 9.14876;
                            }
                            else if (data.origin_wind_dir > 185) {
                                return 7.09395;
                            }
                            else if (data.origin_wind_dir <= 185) {
                                if (data.dest_pressure === null) {
                                    return 13.58517;
                                }
                                else if (data.dest_pressure > 1012) {
                                    return 10.97263;
                                }
                                else if (data.dest_pressure <= 1012) {
                                    return 20.74727;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
};

const predict = function (data) {
    //return predictDelay(data) - ((data.dest_wind_dir % 2 )? 1 : -1 ) * (data.dest_wind_dir ) / 13;
    return predictDelay(data);
};

export default predict;