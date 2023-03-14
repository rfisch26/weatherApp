<?php 
class final_rest
{



/**
 * @api  /api/v1/setTemp/
 * @apiName setTemp
 * @apiDescription Add remote temperature measurement
 *
 * @apiParam {string} location
 * @apiParam {String} sensor
 * @apiParam {double} value
 *
 * @apiSuccess {Integer} status
 * @apiSuccess {string} message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":0,
 *              "message": ""
 *     }
 *
 * @apiError Invalid data types
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":1,
 *              "message":"Error Message"
 *     }
 *
 */
	public static function setTemp ($location, $sensor, $value)

	{
		if (!is_numeric($value)) {
			$retData["status"]=1;
			$retData["message"]="'$value' is not numeric";
		}
		else {
			try {
				EXEC_SQL("insert into temperature (location, sensor, value, date) values (?,?,?,CURRENT_TIMESTAMP)",$location, $sensor, $value);
				$retData["status"]=0;
				$retData["message"]="insert of '$value' for location: '$location' and sensor '$sensor' accepted";
			}
			catch  (Exception $e) {
				$retData["status"]=1;
				$retData["message"]=$e->getMessage();
			}
		}

		return json_encode ($retData);
	}

	public static function setWeather ($location, $mapJson, $weatherJson)

        {
                        try {
                                EXEC_SQL("insert into weather (Location, MapJson, WeatherJson, DateTime) values (?,?,?,CURRENT_TIMESTAMP)",$location, $mapJson, $weatherJson);
                                $retData["status"]=0;
                                $retData["message"]="insert of '$mapJson' and '$weatherJson' for location: '$location' accepted";
                        }
                        catch  (Exception $e) {
                                $retData["status"]=1;
                                $retData["message"]=$e->getMessage();
                        }

                return json_encode ($retData);
	}

	public static function getWeather ($dateTime) {
		try {
                               	$retData["result"] = GET_SQL("select * from weather where DateTime like ? order by DateTime", $dateTime . "%");
                                $retData["status"]=0;
                                $retData["message"]="weather results were found for '$dateTime'";
                        }
                        catch  (Exception $e) {
                                $retData["status"]=1;
                                $retData["message"]=$e->getMessage();
                        }

                return json_encode ($retData);
	}
}

