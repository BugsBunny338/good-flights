
/**
 *  Predictor for ARR_DELAY from model/5a5f680692fb563341001617
 *  Predictive model by BigML - Machine Learning Made Easy
 */
function predictArr_delay(data) {
    if (data.crs_arr_time_bucket === null) {
        return 5.53226;
    }
    else if (data.crs_arr_time_bucket==="E") {
        return 13.30138;
    }
    else if (data.crs_arr_time_bucket!=="E") {
        if (data.crs_dep_time_bucket === null) {
            return 2.1327;
        }
        else if (data.crs_dep_time_bucket==="M") {
            if (data.origin_state === null) {
                return -0.72919;
            }
            else if (data.origin_state==="CA") {
                if (data.duration_bucket === null) {
                    return 3.57487;
                }
                else if (data.duration_bucket==="S") {
                    if (data.crs_arr_time_bucket==="A") {
                        if (data.dest_wind_speed === null) {
                            return 16.98877;
                        }
                        else if (data.dest_wind_speed > 9) {
                            return 73;
                        }
                        else if (data.dest_wind_speed <= 9) {
                            if (data.dest_precipitation_3h === null) {
                                return 16.50657;
                            }
                            else if (data.dest_precipitation_3h > 1) {
                                return 46.87692;
                            }
                            else if (data.dest_precipitation_3h <= 1) {
                                if (data.dest_pressure === null) {
                                    return 15.58497;
                                }
                                else if (data.dest_pressure > 1007) {
                                    if (data.origin_precipitation_3h_3h === null) {
                                        return 15.18148;
                                    }
                                    else if (data.origin_precipitation_3h_3h > 4) {
                                        return 98.57143;
                                    }
                                    else if (data.origin_precipitation_3h_3h <= 4) {
                                        if (data.dep_day_of_week === null) {
                                            return 14.90613;
                                        }
                                        else if (data.dep_day_of_week==="THU") {
                                            return 23.40199;
                                        }
                                        else if (data.dep_day_of_week!=="THU") {
                                            return 13.50027;
                                        }
                                    }
                                }
                                else if (data.dest_pressure <= 1007) {
                                    return 72.8;
                                }
                            }
                        }
                    }
                    else if (data.crs_arr_time_bucket!=="A") {
                        if (data.carrier === null) {
                            return 8.47097;
                        }
                        else if (data.carrier==="UAL") {
                            return 3.01679;
                        }
                        else if (data.carrier!=="UAL") {
                            if (data.dest_precipitation_3h === null) {
                                return 10.53037;
                            }
                            else if (data.dest_precipitation_3h > 1) {
                                return 31.86207;
                            }
                            else if (data.dest_precipitation_3h <= 1) {
                                if (data.dest_air_temp === null) {
                                    return 10.1439;
                                }
                                else if (data.dest_air_temp > 16) {
                                    return 5.31417;
                                }
                                else if (data.dest_air_temp <= 16) {
                                    if (data.dep_month === null) {
                                        return 11.81609;
                                    }
                                    else if (data.dep_month==="AUG") {
                                        return 30.24479;
                                    }
                                    else if (data.dep_month!=="AUG") {
                                        if (data.carrier==="DAL") {
                                            return 15.18902;
                                        }
                                        else if (data.carrier!=="DAL") {
                                            return 8.48855;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if (data.duration_bucket!=="S") {
                    return -0.17249;
                }
            }
            else if (data.origin_state!=="CA") {
                if (data.dep_month === null) {
                    return -3.17128;
                }
                else if (data.dep_month==="DEC") {
                    if (data.dest_precipitation_3h === null) {
                        return 11.18316;
                    }
                    else if (data.dest_precipitation_3h > 1) {
                        return 38.77419;
                    }
                    else if (data.dest_precipitation_3h <= 1) {
                        if (data.dest_state === null) {
                            return 9.05019;
                        }
                        else if (data.dest_state==="CA") {
                            if (data.origin_precipitation_3h_3h === null) {
                                return 16.43884;
                            }
                            else if (data.origin_precipitation_3h_3h > 1) {
                                if (data.origin_pressure === null) {
                                    return 52;
                                }
                                else if (data.origin_pressure > 1021) {
                                    if (data.origin_air_temp === null) {
                                        return 176.86667;
                                    }
                                    else if (data.origin_air_temp > -2) {
                                        return 36.5;
                                    }
                                    else if (data.origin_air_temp <= -2) {
                                        return 227.90909;
                                    }
                                }
                                else if (data.origin_pressure <= 1021) {
                                    return 29.43373;
                                }
                            }
                            else if (data.origin_precipitation_3h_3h <= 1) {
                                return 14.15958;
                            }
                        }
                        else if (data.dest_state!=="CA") {
                            return 1.44655;
                        }
                    }
                }
                else if (data.dep_month!=="DEC") {
                    if (data.origin_state==="CO") {
                        if (data.dest_state === null) {
                            return 0.5278;
                        }
                        else if (data.dest_state==="CA") {
                            if (data.dest_pressure === null) {
                                return 3.73915;
                            }
                            else if (data.dest_pressure > 1008) {
                                if (data.dep_month==="OCT") {
                                    return 16.29863;
                                }
                                else if (data.dep_month!=="OCT") {
                                    if (data.carrier === null) {
                                        return 1.88202;
                                    }
                                    else if (data.carrier==="VRD") {
                                        return -9.96667;
                                    }
                                    else if (data.carrier!=="VRD") {
                                        if (data.dep_month==="FEB") {
                                            return -9.8843;
                                        }
                                        else if (data.dep_month!=="FEB") {
                                            if (data.crs_arr_time_bucket==="A") {
                                                return 10.00271;
                                            }
                                            else if (data.crs_arr_time_bucket!=="A") {
                                                return 1.90228;
                                            }
                                        }
                                    }
                                }
                            }
                            else if (data.dest_pressure <= 1008) {
                                return 53.76316;
                            }
                        }
                        else if (data.dest_state!=="CA") {
                            if (data.dest_air_temp === null) {
                                return -3.06755;
                            }
                            else if (data.dest_air_temp > 28) {
                                return 6.34536;
                            }
                            else if (data.dest_air_temp <= 28) {
                                if (data.dep_month==="OCT") {
                                    return -12.94798;
                                }
                                else if (data.dep_month!=="OCT") {
                                    return -3.15264;
                                }
                            }
                        }
                    }
                    else if (data.origin_state!=="CO") {
                        if (data.origin_air_temp === null) {
                            return -5.35613;
                        }
                        else if (data.origin_air_temp > 20) {
                            if (data.carrier === null) {
                                return -0.60599;
                            }
                            else if (data.carrier==="AAL") {
                                return 3.14153;
                            }
                            else if (data.carrier!=="AAL") {
                                return -2.42149;
                            }
                        }
                        else if (data.origin_air_temp <= 20) {
                            if (data.origin_precipitation_3h_3h === null) {
                                return -7.35022;
                            }
                            else if (data.origin_precipitation_3h_3h > 1) {
                                return 3.33972;
                            }
                            else if (data.origin_precipitation_3h_3h <= 1) {
                                return -7.76743;
                            }
                        }
                    }
                }
            }
        }
        else if (data.crs_dep_time_bucket!=="M") {
            if (data.origin_air_temp === null) {
                return 5.81133;
            }
            else if (data.origin_air_temp > 22) {
                if (data.origin_state === null) {
                    return 11.64601;
                }
                else if (data.origin_state==="VA") {
                    return -1.2888;
                }
                else if (data.origin_state!=="VA") {
                    return 12.64578;
                }
            }
            else if (data.origin_air_temp <= 22) {
                if (data.duration_bucket === null) {
                    return 4.24809;
                }
                else if (data.duration_bucket==="S") {
                    if (data.crs_dep_time_bucket==="N") {
                        return -10.75499;
                    }
                    else if (data.crs_dep_time_bucket!=="N") {
                        if (data.dest_precipitation_3h === null) {
                            return 11.3537;
                        }
                        else if (data.dest_precipitation_3h > 0) {
                            return 38.30673;
                        }
                        else if (data.dest_precipitation_3h <= 0) {
                            if (data.origin_state === null) {
                                return 10.2717;
                            }
                            else if (data.origin_state==="CA") {
                                if (data.origin_pressure === null) {
                                    return 13.59189;
                                }
                                else if (data.origin_pressure > 1010) {
                                    if (data.dest_wind_speed === null) {
                                        return 12.53381;
                                    }
                                    else if (data.dest_wind_speed > 3) {
                                        return 17.32371;
                                    }
                                    else if (data.dest_wind_speed <= 3) {
                                        if (data.origin_precipitation_3h_3h === null) {
                                            return 10.67142;
                                        }
                                        else if (data.origin_precipitation_3h > 0) {
                                            return 33.35135;
                                        }
                                        else if (data.origin_precipitation_3h_3h <= 0) {
                                            if (data.dep_day_of_week === null) {
                                                return 10.11458;
                                            }
                                            else if (data.dep_day_of_week==="MON") {
                                                if (data.dep_month === null) {
                                                    return 3.08984;
                                                }
                                                else if (data.dep_month==="SEP") {
                                                    if (data.dest_wind_dir === null) {
                                                        return 30.93182;
                                                    }
                                                    else if (data.dest_wind_dir > 145) {
                                                        if (data.origin_wind_dir === null) {
                                                            return 82.17647;
                                                        }
                                                        else if (data.origin_wind_dir > 90) {
                                                            if (data.origin_wind_speed === null) {
                                                                return 132.90909;
                                                            }
                                                            else if (data.origin_wind_speed > 3) {
                                                                return 0;
                                                            }
                                                            else if (data.origin_wind_speed <= 3) {
                                                                return 182.75;
                                                            }
                                                        }
                                                        else if (data.origin_wind_dir <= 90) {
                                                            return -10.83333;
                                                        }
                                                    }
                                                    else if (data.dest_wind_dir <= 145) {
                                                        return -1.33333;
                                                    }
                                                }
                                                else if (data.dep_month!=="SEP") {
                                                    return 1.16063;
                                                }
                                            }
                                            else if (data.dep_day_of_week!=="MON") {
                                                return 11.35607;
                                            }
                                        }
                                    }
                                }
                                else if (data.origin_pressure <= 1010) {
                                    return 36.43289;
                                }
                            }
                            else if (data.origin_state!=="CA") {
                                if (data.origin_precipitation_3h_3h === null) {
                                    return 3.41221;
                                }
                                else if (data.origin_precipitation_3h_3h > 1) {
                                    return 27.47712;
                                }
                                else if (data.origin_precipitation_3h_3h <= 1) {
                                    if (data.origin_wind_speed === null) {
                                        return 2.22641;
                                    }
                                    else if (data.origin_wind_speed > 7) {
                                        return 11.87324;
                                    }
                                    else if (data.origin_wind_speed <= 7) {
                                        if (data.dep_month === null) {
                                            return 0.38804;
                                        }
                                        else if (data.dep_month==="JUL") {
                                            return 26.6087;
                                        }
                                        else if (data.dep_month!=="JUL") {
                                            if (data.dep_month==="JUN") {
                                                return 14.6875;
                                            }
                                            else if (data.dep_month!=="JUN") {
                                                return -1.44266;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if (data.duration_bucket!=="S") {
                    if (data.dep_month === null) {
                        return 1.75421;
                    }
                    else if (data.dep_month==="DEC") {
                        if (data.dest_state === null) {
                            return 10.2581;
                        }
                        else if (data.dest_state==="CA") {
                            return 21.03176;
                        }
                        else if (data.dest_state!=="CA") {
                            if (data.origin_air_temp > 21) {
                                return 69.25;
                            }
                            else if (data.origin_air_temp <= 21) {
                                if (data.origin_precipitation_3h_3h === null) {
                                    return 4.56253;
                                }
                                else if (data.origin_precipitation_3h_3h > 0) {
                                    return 27.30108;
                                }
                                else if (data.origin_precipitation_3h_3h <= 0) {
                                    return 3.33449;
                                }
                            }
                        }
                    }
                    else if (data.dep_month!=="DEC") {
                        if (data.origin_state === null) {
                            return 0.81521;
                        }
                        else if (data.origin_state==="VA") {
                            return -11.72924;
                        }
                        else if (data.origin_state!=="VA") {
                            if (data.dep_month==="NOV") {
                                if (data.dest_air_temp === null) {
                                    return -5.5648;
                                }
                                else if (data.dest_air_temp > 17) {
                                    return -15.75532;
                                }
                                else if (data.dest_air_temp <= 17) {
                                    if (data.origin_wind_dir === null) {
                                        return -2.95754;
                                    }
                                    else if (data.origin_wind_dir > 135) {
                                        return -5.89564;
                                    }
                                    else if (data.origin_wind_dir <= 135) {
                                        return 2.80968;
                                    }
                                }
                            }
                            else if (data.dep_month!=="NOV") {
                                return 2.38312;
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}