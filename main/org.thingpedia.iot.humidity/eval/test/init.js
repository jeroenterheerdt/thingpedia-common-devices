[{
    "a_id": "humidity",
    "ha": {
        "domain": "sensor",
        "entity_id": "humidity_level",
        "init_call": {
            "i_state": {
                "rng": "0,100",
                "k": "number"
            },
            "attrib": {
                "friendly_name": "Humidity Sensor",
                "unit_of_measurement": "%",
                "device_class": "humidity"
            }
        }
    }
}, {
    "a_id": "humidity",
    "ha": {
        "domain": "binary_sensor",
        "entity_id": "humidity_state",
        "init_call": {
            "i_val": {
                "rng": "low,normal",
                "k": "state"
            },
            "attrib": {
                "friendly_name": "Humidity State",
                "device_class": "humidity"
            }
        }
    }
}]