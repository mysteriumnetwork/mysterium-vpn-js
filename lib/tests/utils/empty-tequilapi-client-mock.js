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
var EmptyTequilapiClientMock = /** @class */ (function () {
    function EmptyTequilapiClientMock() {
    }
    EmptyTequilapiClientMock.prototype.connectionCancel = function () {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.connectionCreate = function (request, timeout) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.connectionIP = function (timeout) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.connectionStatistics = function () {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.connectionStatus = function () {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.findProposals = function (options) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.healthCheck = function (timeout) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.identitiesList = function () {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.identityCreate = function (passphrase) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.identityRegistration = function (id) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.identityUnlock = function (id, passphrase, timeout) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.location = function (timeout) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.serviceGet = function (serviceId) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.serviceList = function () {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.serviceStart = function (request, timeout) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.serviceStop = function (serviceId) {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.sessionsList = function () {
        throw Error('Not implemented');
    };
    EmptyTequilapiClientMock.prototype.stop = function () {
        throw Error('Not implemented');
    };
    return EmptyTequilapiClientMock;
}());
exports.EmptyTequilapiClientMock = EmptyTequilapiClientMock;
