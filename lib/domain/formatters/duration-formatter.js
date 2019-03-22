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
var DurationFormatter = /** @class */ (function () {
    function DurationFormatter() {
    }
    /**
     * @function
     * @param {number} seconds
     * @returns {string} readable in --:--:-- format
     * @throws {Error} if argument is null
     */
    DurationFormatter.prototype.format = function (seconds) {
        if (typeof seconds !== 'number' || seconds < 0) {
            throw new Error('invalid input');
        }
        var h = this.formatTwoDigitNumber(Math.floor(seconds / 3600));
        var m = this.formatTwoDigitNumber(Math.floor((seconds % 3600) / 60));
        var s = this.formatTwoDigitNumber(seconds % 60);
        return h + ":" + m + ":" + s;
    };
    DurationFormatter.prototype.formatOrDefault = function (seconds) {
        try {
            return this.format(seconds);
        }
        catch (err) {
            return timeDisplayDefault;
        }
    };
    DurationFormatter.prototype.formatTwoDigitNumber = function (value) {
        return value > 9 ? value.toString() : "0" + value;
    };
    return DurationFormatter;
}());
exports.DurationFormatter = DurationFormatter;
var timeDisplayDefault = '--:--:--';
