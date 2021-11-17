// -*- mode: js; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// This file is part of io.home-assistant
//
// Copyright 2019 Xiaomeng Jin <tracyjxm@stanford.edu>
//
// See LICENSE for details
"use strict";

const HomeAssistantDevice = require('./base');

module.exports = class HomeAssistantSensor extends HomeAssistantDevice {
    constructor(engine, state, master, entityId) {
        super(engine, state, master, entityId);
        const [domain, ] = entityId.split('.');
        this.domain = domain;
        this.device_class = this.state.attributes.device_class;
        if (['binary_sensor', 'cover'].includes(this.domain)) {
            let supportedDeviceClasses = {
                battery: {
                    on: 'low',
                    off: 'normal'
                },
                carbon_monoxide: {
                    on: 'detecting',
                    off: 'not_detecting'
                },
                carbon_dioxide: {
                    on: 'detecting',
                    off: 'not_detecting'
                },
                cold: {
                    on: 'cold',
                    off: 'normal'
                },
                connectivity: {
                    on: 'connected',
                    off: 'disconnected'
                },
                door: {
                    on: 'open',
                    off: 'closed'
                },
                flood: {
                    on: 'flooding',
                    off: 'not_flooding'
                },
                garage: {
                    on: 'open',
                    off: 'closed'
                },
                garage_door: {
                    on: 'open',
                    off: 'closed'
                },
                gas: {
                    on: 'detecting',
                    off: 'not_detecting'
                },
                heat: {
                    on: 'hot',
                    off: 'normal'
                },
                humidity: {
                    on: 'humid',
                    off: 'normal',
                },
                moisture: {
                    on: 'wet',
                    off: 'dry'
                },
                motion: {
                    on: 'detecting',
                    off: 'not_detecting'
                },
                occupancy: {
                    on: 'detecting',
                    off: 'not_detecting'
                },
                plug: {
                    on: 'plugged',
                    off: 'unplugged'
                },
                sound: {
                    on: 'detecting',
                    off: 'not_detecting'
                },
                smoke: {
                    on: 'detecting',
                    off: 'nothing'
                },
                window: {
                    on: 'open',
                    off: 'closed'
                }
            };
            this.deviceStateMapping = supportedDeviceClasses[this.device_class] || { on: 'on', off: 'off' };
        }
    }
    async get_state() {
        if (this.domain === 'sensor') {
            let value = parseFloat(this.state.state);
            return [{ state: undefined, value: value }];
        } else if (this.domain === 'binary_sensor') {
            let state = this.deviceStateMapping[this.state.state];
            if (['gas', 'CO', 'CO2', 'smoke'].includes(this.device_class))
                state = state === 'detecting' ? this.device_class : 'nothing';
            return [{ state: state, value: undefined }];
        } else {
            throw new Error(`Unexpected Home Assistant domain ${this.domain}`);
        }
    }
        // note: subscribe_ must NOT be async, or an ImplementationError will occur at runtime
    subscribe_state() {
        if (this.domain === 'sensor') {
            return this._subscribeState(() => {
                return { state: undefined, value: parseFloat(this.state.state) };
            });
        } else if (this.domain === 'binary_sensor') {
            return this._subscribeState(() => {
                let state = this.deviceStateMapping[this.state.state];
                if (['gas', 'CO', 'CO2', 'smoke'].includes(this.device_class))
                    state = state === 'detecting' ? this.device_class : 'nothing';
                return { state: state, value: undefined };
            });
        } else {
            throw new Error(`Unexpected Home Assistant domain ${this.domain}`);
        }
    }
        // Specific query methods for sensors that use a different Thingpedia function name
        // than the generic state
        // (in other gateways/APIs, a single device can implement multiple of these interfaces,
        // so we give them different names so they don't conflict)
    async get_motion() {
        return this.get_state();
    }
    subscribe_motion() {
        return this.subscribe_state();
    }
    async get_occupancy() {
        return this.get_state();
    }
    subscribe_occupancy() {
        return this.subscribe_state();
    }
    async get_sound() {
        return this.get_state();
    }
    subscribe_sound() {
        return this.subscribe_state();
    }
    async get_illuminance() {
        return this.get_state();
    }
    subscribe_illuminance() {
        return this.subscribe_state();
    }
    async get_uv() {
        return this.get_state();
    }
    subscribe_uv() {
        return this.subscribe_state();
    }
    async get_flood() {
        return this.get_state();
    }
    subscribe_flood() {
        return this.subscribe_state();
    }
    async get_temperature() {
        return this.get_state();
    }
    subscribe_temperature() {
        return this.subscribe_state();
    }
    async get_humidity() {
        return this.get_state();
    }
    subscribe_humidity() {
        return this.subscribe_state();
    }
};