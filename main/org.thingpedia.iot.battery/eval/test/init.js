[{
    "a_id": "battery",
    "ha": {
        "domain": "sensor",
        "entity_id": "device_battery_level",
        "init_call": {
            "i_state": {
                "rng": "0,100",
                "k": "number"
            },
            "attrib": {
                "friendly_name": "UPS",
                "unit_of_measurement": "%",
                "device_class": "battery"
            }
        }
    }
}, {
    "a_id": "battery",
    "ha": {
        "domain": "binary_sensor",
        "entity_id": "sensor_battery_state",
        "init_call": {
            "i_state": {
                "rng": "low,normal",
                "k": "state"
            },
            "attrib": {
                "friendly_name": "Sensor's Battery State",
                "device_class": "battery"
            }
        }
    }
}, {
    "a_id": "battery_charging",
    "ha": {
        "domain": "binary_sensor",
        "entity_id": "sensor_battery_charge",
        "init_call": {
            "i_state": {
                "rng": "charging,not_charging",
                "k": "state"
            },
            "attrib": {
                "friendly_name": "Battery charging State",
                "device_class": "battery_charging",
                "unique_id": "battery_charge_sensor"
            }
        }
    }
}]