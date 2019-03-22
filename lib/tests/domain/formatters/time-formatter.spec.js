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
var time_formatter_1 = require("../../../domain/formatters/time-formatter");
describe('TimeFormatter', function () {
    var formatter;
    beforeEach(function () {
        formatter = new time_formatter_1.TimeFormatter(-120);
    });
    describe('.getCurrentgetCurrentISODateTimegetCurrentISODateTimeDateTime', function () {
        it('returns a string representing current time', function () {
            var current = formatter.getCurrentISODateTime();
            expect(Date.parse(current)).not.toBeNaN();
        });
    });
    describe('.formatISODateTime', function () {
        var datetime = new Date(Date.parse('04 Dec 1995 00:12:00 GMT'));
        it('returns ISO formatted string from datetime number', function () {
            expect(formatter.formatISODateTime(datetime)).toEqual('1995-12-04T00:12:00.000Z');
        });
    });
    describe('.formatTime', function () {
        it('returns readable time in given timezone', function () {
            var date = new Date(Date.UTC(2018, 8, 24, 14, 3, 55));
            expect(formatter.formatTime(date)).toEqual('16:03:55');
        });
    });
    describe('.formatDate', function () {
        it('returns readable date', function () {
            var date = new Date(Date.UTC(2018, 8, 24, 14, 3, 55));
            expect(formatter.formatDate(date)).toEqual('24/09/2018');
        });
        it('returns different day when day differs for given timezone offset', function () {
            var date = new Date(Date.UTC(2018, 8, 24, 23, 3, 55));
            expect(formatter.formatDate(date)).toEqual('25/09/2018');
        });
    });
});
