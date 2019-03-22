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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var service_status_1 = require("mysterium-tequilapi/lib/dto/service-status");
var tequilapi_error_1 = __importDefault(require("mysterium-tequilapi/lib/tequilapi-error"));
var logger_1 = require("../logger");
var service_status_2 = require("../models/service-status");
var function_looper_1 = require("./looper/function-looper");
var publisher_1 = require("./publisher");
var ProviderService = /** @class */ (function () {
    function ProviderService(tequilapiClient) {
        this.tequilapiClient = tequilapiClient;
        this.statusPublisher = new publisher_1.Publisher();
        this.lastStatus = service_status_2.ServiceStatus.NOT_RUNNING;
    }
    ProviderService.prototype.checkForExistingService = function () {
        return __awaiter(this, void 0, void 0, function () {
            var service;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findRunningService()];
                    case 1:
                        service = _a.sent();
                        if (!service) {
                            return [2 /*return*/];
                        }
                        this.handleStartedService(service);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.isActive = function () {
        return __awaiter(this, void 0, void 0, function () {
            var service, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.findRunningService()];
                    case 1:
                        service = _a.sent();
                        return [2 /*return*/, !!service];
                    case 2:
                        e_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    ProviderService.prototype.findRunningService = function () {
        return __awaiter(this, void 0, void 0, function () {
            var services, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tequilapiClient.serviceList()];
                    case 1:
                        services = _a.sent();
                        return [2 /*return*/, services.pop()];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.start = function (providerId, serviceType) {
        return __awaiter(this, void 0, void 0, function () {
            var service;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tequilapiClient.serviceStart({
                            providerId: providerId,
                            type: serviceType
                        })];
                    case 1:
                        service = _a.sent();
                        this.handleStartedService(service);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.serviceInstance) {
                            throw new Error('Service id is unknown, make sure to start service before stopping it');
                        }
                        return [4 /*yield*/, this.tequilapiClient.serviceStop(this.serviceInstance.id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.stopFetchingStatus()];
                    case 2:
                        _a.sent();
                        this.processStatus(service_status_2.ServiceStatus.NOT_RUNNING);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.addStatusSubscriber = function (subscriber) {
        this.statusPublisher.addSubscriber(subscriber);
        subscriber(this.lastStatus);
    };
    ProviderService.prototype.removeStatusSubscriber = function (subscriber) {
        this.statusPublisher.removeSubscriber(subscriber);
    };
    ProviderService.prototype.handleStartedService = function (service) {
        this.serviceInstance = service;
        this.processNewServiceInfo(service);
        this.startFetchingStatus();
    };
    ProviderService.prototype.startFetchingStatus = function () {
        var _this = this;
        this.statusFetcher = new function_looper_1.FunctionLooper(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.fetchStatus()];
        }); }); }, 1000);
        this.statusFetcher.start();
    };
    ProviderService.prototype.stopFetchingStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.statusFetcher) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.statusFetcher.stop()];
                    case 1:
                        _a.sent();
                        this.statusFetcher = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.fetchStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var service, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.serviceInstance) {
                            logger_1.logger.error('Service status fetching failed because serviceId is missing');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.tequilapiClient.serviceGet(this.serviceInstance.id)];
                    case 2:
                        service = _a.sent();
                        this.processNewServiceInfo(service);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1.name === tequilapi_error_1.default.name && err_1.isNotFoundError) {
                            this.processStatus(service_status_2.ServiceStatus.NOT_RUNNING);
                            this.stopFetchingStatus().catch(function (err) { return logger_1.logger.error('Failed stopping fetching status', err); });
                            return [2 /*return*/];
                        }
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProviderService.prototype.processNewServiceInfo = function (info) {
        var status = this.serviceStatusDTOToModel(info.status);
        this.processStatus(status);
    };
    ProviderService.prototype.processStatus = function (status) {
        if (status === this.lastStatus) {
            return;
        }
        this.statusPublisher.publish(status);
        this.lastStatus = status;
    };
    ProviderService.prototype.serviceStatusDTOToModel = function (status) {
        if (status === service_status_1.ServiceStatus.NOT_RUNNING) {
            return service_status_2.ServiceStatus.NOT_RUNNING;
        }
        if (status === service_status_1.ServiceStatus.STARTING) {
            return service_status_2.ServiceStatus.STARTING;
        }
        if (status === service_status_1.ServiceStatus.RUNNING) {
            return service_status_2.ServiceStatus.RUNNING;
        }
        throw new Error("Unknown status: " + status);
    };
    return ProviderService;
}());
exports.ProviderService = ProviderService;
