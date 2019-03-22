"use strict";
/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
/**
 * Allows subscribing callbacks and publishing data to them.
 */
var Publisher = /** @class */ (function () {
    function Publisher() {
        this.subscribers = [];
    }
    Publisher.prototype.addSubscriber = function (subscriber) {
        var _this = this;
        this.subscribers.push(subscriber);
        return function () { _this.removeSubscriber(subscriber); };
    };
    Publisher.prototype.removeSubscriber = function (subscriber) {
        var index = this.subscribers.indexOf(subscriber);
        if (index === -1) {
            throw new Error('Callback being unsubscribed was not found');
        }
        this.subscribers.splice(index, 1);
    };
    Publisher.prototype.publish = function (data) {
        this.subscribers.forEach(function (callback) {
            try {
                callback(data);
            }
            catch (err) {
                logger_1.logger.error('Callback call in Publisher failed', err);
            }
        });
    };
    return Publisher;
}());
exports.Publisher = Publisher;
