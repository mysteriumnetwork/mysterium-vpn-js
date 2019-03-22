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
var bytes_formatter_1 = require("../../../domain/formatters/bytes-formatter");
describe('BytesFormatter', function () {
    var formatter = new bytes_formatter_1.BytesFormatter();
    describe('.format', function () {
        it('returns object with value (fixed 2 decimals) and units ', function () {
            var val = 123;
            var result = formatter.format(val);
            expect(result.units).toEqual('B');
            expect(result.amount).toEqual('123.00');
        });
        it('calculates one Byte correctly', function () {
            var val = 1;
            var result = formatter.format(val);
            expect(result.units).toEqual('B');
            expect(result.amount).toEqual('1.00');
        });
        it('calculates one KB correctly', function () {
            var val = 1024;
            var result = formatter.format(val);
            expect(result.units).toEqual('KB');
            expect(result.amount).toEqual('1.00');
        });
        it('calculates one MB correctly', function () {
            var val = 1024 * 1024;
            var result = formatter.format(val);
            expect(result.units).toEqual('MB');
            expect(result.amount).toEqual('1.00');
        });
        it('calculates one GB correctly', function () {
            var val = 1024 * 1024 * 1024;
            var result = formatter.format(val);
            expect(result.units).toEqual('GB');
            expect(result.amount).toEqual('1.00');
        });
        it('calculates one TB correctly', function () {
            var val = 1024 * 1024 * 1024 * 1024;
            var result = formatter.format(val);
            expect(result.units).toEqual('TB');
            expect(result.amount).toEqual('1.00');
        });
        it('returns 0', function () {
            expect(formatter.format(0).amount).toEqual('0.00');
        });
        it('throws', function () {
            expect(function () { return formatter.format(undefined); }).toThrowError('provide valid input for conversion');
            expect(function () { return formatter.format('str'); }).toThrowError('provide valid input for conversion');
        });
    });
    describe('.formatOrDefault', function () {
        it('returns readable value', function () {
            expect(formatter.formatOrDefault(10000)).toEqual({
                amount: '9.77',
                units: 'KB'
            });
        });
        it('returns default value when parsing fails', function () {
            expect(formatter.formatOrDefault('a')).toEqual({
                amount: '-',
                units: 'KB'
            });
        });
    });
});
