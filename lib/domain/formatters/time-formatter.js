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
var TimeFormatter = /** @class */ (function () {
    function TimeFormatter(minutesOffset) {
        this.minutesOffset = minutesOffset;
    }
    TimeFormatter.prototype.formatDate = function (date) {
        var newDate = this.getDateWithOffset(date);
        var year = newDate.getUTCFullYear();
        var month = this.formatTwoDigitNumber(newDate.getUTCMonth() + 1);
        var day = this.formatTwoDigitNumber(newDate.getUTCDate());
        return day + "/" + month + "/" + year;
    };
    TimeFormatter.prototype.formatTime = function (date) {
        var newDate = this.getDateWithOffset(date);
        var hours = this.formatTwoDigitNumber(newDate.getUTCHours());
        var minutes = this.formatTwoDigitNumber(newDate.getUTCMinutes());
        var seconds = this.formatTwoDigitNumber(newDate.getUTCSeconds());
        return hours + ":" + minutes + ":" + seconds;
    };
    TimeFormatter.prototype.formatISODateTime = function (date) {
        return date.toISOString();
    };
    TimeFormatter.prototype.getCurrentISODateTime = function () {
        return this.formatISODateTime(new Date());
    };
    TimeFormatter.prototype.getDateWithOffset = function (date) {
        var newDate = new Date(date.getTime());
        newDate.setMinutes(newDate.getMinutes() - this.minutesOffset);
        return newDate;
    };
    TimeFormatter.prototype.formatTwoDigitNumber = function (value) {
        return value > 9 ? value.toString() : "0" + value;
    };
    return TimeFormatter;
}());
exports.TimeFormatter = TimeFormatter;
