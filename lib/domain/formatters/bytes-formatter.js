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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var filesize_1 = __importDefault(require("filesize"));
var BytesFormatter = /** @class */ (function () {
    function BytesFormatter() {
    }
    /**
     * @function
     * @param {number} bytes
     * @returns {{amount:number,units:string}} result - holds amount and units
     * @throws if argument is null
     */
    BytesFormatter.prototype.format = function (bytes) {
        if (typeof bytes !== 'number') {
            throw new Error('provide valid input for conversion');
        }
        var calculated = filesize_1.default(bytes, { standard: 'jedec', output: 'object' });
        return {
            amount: calculated.value.toFixed(2),
            units: calculated.symbol.replace('i', '')
        };
    };
    BytesFormatter.prototype.formatOrDefault = function (bytes) {
        try {
            return this.format(bytes);
        }
        catch (err) {
            return bytesReadableDefault;
        }
    };
    return BytesFormatter;
}());
exports.BytesFormatter = BytesFormatter;
var bytesReadableDefault = { amount: '-', units: 'KB' };
