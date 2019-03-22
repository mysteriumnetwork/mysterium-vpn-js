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
var duration_formatter_1 = require("../../../domain/formatters/duration-formatter");
describe('DurationFormatter', function () {
    var formatter = new duration_formatter_1.DurationFormatter();
    describe('.format', function () {
        it('converts time correctly', function () {
            expect(formatter.format(60 * 60 + 60 + 1)).toEqual('01:01:01');
            expect(formatter.format(60 * 60 * 24 * 5)).toEqual('120:00:00');
        });
        it('throws invalid parameter types', function () {
            expect(function () { return formatter.format(null); }).toThrowError('invalid input');
            expect(function () { return formatter.format(undefined); }).toThrowError('invalid input');
            expect(function () { return formatter.format('some string'); }).toThrowError('invalid input');
            expect(function () { return formatter.format(-10); }).toThrowError('invalid input');
        });
    });
    describe('.formatOrDefault', function () {
        it('returns display value', function () {
            expect(formatter.formatOrDefault(60 * 60 + 60 + 1)).toEqual('01:01:01');
        });
        it('returns default value when parsing fails', function () {
            expect(formatter.formatOrDefault('a')).toEqual('--:--:--');
        });
    });
});
