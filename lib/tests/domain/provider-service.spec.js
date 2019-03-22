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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var lolex_1 = __importDefault(require("lolex"));
var service_status_1 = require("mysterium-tequilapi/lib/dto/service-status");
var tequilapi_error_1 = __importDefault(require("mysterium-tequilapi/lib/tequilapi-error"));
var provider_service_1 = require("../../domain/provider-service");
var service_status_2 = require("../../models/service-status");
var empty_tequilapi_client_mock_1 = require("../utils/empty-tequilapi-client-mock");
var utils_1 = require("../utils/utils");
var ProviderServiceTequilapiClientMock = /** @class */ (function (_super) {
    __extends(ProviderServiceTequilapiClientMock, _super);
    function ProviderServiceTequilapiClientMock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.serviceGetInvoked = 0;
        _this.serviceInfoMocks = new Map();
        _this.servicesCreated = 0;
        return _this;
    }
    ProviderServiceTequilapiClientMock.prototype.serviceList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Array.from(this.serviceInfoMocks.values())];
            });
        });
    };
    ProviderServiceTequilapiClientMock.prototype.serviceGet = function (serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                this.serviceGetInvoked++;
                info = this.serviceInfoMocks.get(serviceId);
                if (info === undefined) {
                    throw this.buildTequilapiError('Service not found', 404);
                }
                return [2 /*return*/, info];
            });
        });
    };
    ProviderServiceTequilapiClientMock.prototype.serviceStart = function (request, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var options, proposal, serviceId, serviceInfo;
            return __generator(this, function (_a) {
                this.serviceStarted = request;
                options = {};
                proposal = { id: 1, providerId: request.providerId, serviceType: request.type, serviceDefinition: {} };
                this.servicesCreated += 1;
                serviceId = "service id " + this.servicesCreated;
                serviceInfo = {
                    id: serviceId,
                    options: options,
                    proposal: proposal,
                    providerId: request.providerId,
                    status: service_status_1.ServiceStatus.STARTING,
                    type: request.type
                };
                this.serviceInfoMocks.set(serviceId, serviceInfo);
                return [2 /*return*/, serviceInfo];
            });
        });
    };
    ProviderServiceTequilapiClientMock.prototype.serviceStop = function (serviceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.serviceStopped = serviceId;
                if (!this.serviceInfoMocks.delete(serviceId)) {
                    throw Error('Stopping service not found');
                }
                return [2 /*return*/];
            });
        });
    };
    // TODO: refactor TequilapiError to allow instantiating TequilapiError with custom status easier,
    // i.e. add 'status' as constructor parameter
    ProviderServiceTequilapiClientMock.prototype.buildTequilapiError = function (message, status) {
        var originalError = new Error(message);
        var originalErrorObj = originalError;
        originalErrorObj.response = { status: status };
        return new tequilapi_error_1.default(originalError, '/mock-path');
    };
    return ProviderServiceTequilapiClientMock;
}(empty_tequilapi_client_mock_1.EmptyTequilapiClientMock));
describe('ProviderService', function () {
    var service;
    var tequilapiClient;
    var providerId = 'my provider id';
    var clock;
    beforeAll(function () {
        clock = lolex_1.default.install();
    });
    afterAll(function () {
        clock.uninstall();
    });
    beforeEach(function () {
        tequilapiClient = new ProviderServiceTequilapiClientMock();
        service = new provider_service_1.ProviderService(tequilapiClient);
    });
    describe('.start', function () {
        it('starts providing service', function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        expectedService = { providerId: providerId, type: 'test service' };
                        expect(tequilapiClient.serviceStarted).toEqual(expectedService);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('.stop', function () {
        it('stops providing service', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, service.stop()];
                    case 2:
                        _a.sent();
                        expect(tequilapiClient.serviceStopped).toEqual('service id 1');
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws error when stopping without starting', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(service.stop())
                    .rejects.toHaveProperty('message', 'Service id is unknown, make sure to start service before stopping it');
                return [2 /*return*/];
            });
        }); });
    });
    describe('.checkForExistingService', function () {
        describe('when existing service is running', function () {
            beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                var otherService;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            otherService = new provider_service_1.ProviderService(tequilapiClient);
                            return [4 /*yield*/, otherService.start(providerId, 'test service')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('updates status when existing service is running', function () { return __awaiter(_this, void 0, void 0, function () {
                var status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            service.addStatusSubscriber(function (newStatus) {
                                status = newStatus;
                            });
                            return [4 /*yield*/, service.checkForExistingService()];
                        case 1:
                            _a.sent();
                            expect(status).toBe(service_status_2.ServiceStatus.STARTING);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('allows stopping existing service', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, service.checkForExistingService()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, service.stop()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('starts notifying about later status changes', function () { return __awaiter(_this, void 0, void 0, function () {
                var status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            service.addStatusSubscriber(function (newStatus) {
                                status = newStatus;
                            });
                            return [4 /*yield*/, service.checkForExistingService()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, service.stop()
                                // give some time for ProviderService to see this change
                            ];
                        case 2:
                            _a.sent();
                            // give some time for ProviderService to see this change
                            return [4 /*yield*/, utils_1.nextTick()];
                        case 3:
                            // give some time for ProviderService to see this change
                            _a.sent();
                            clock.runToLast();
                            return [4 /*yield*/, utils_1.nextTick()];
                        case 4:
                            _a.sent();
                            expect(status).toBe(service_status_2.ServiceStatus.NOT_RUNNING);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        it('does not change status when no services are running', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service.addStatusSubscriber(function (newStatus) {
                            status = newStatus;
                        });
                        return [4 /*yield*/, service.checkForExistingService()];
                    case 1:
                        _a.sent();
                        expect(status).toBe(service_status_2.ServiceStatus.NOT_RUNNING);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('.addStatusSubscriber', function () {
        it('invokes callback with NOT_RUNNING status initially', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                status = null;
                service.addStatusSubscriber(function (newStatus) {
                    status = newStatus;
                });
                expect(status).toBe(service_status_2.ServiceStatus.NOT_RUNNING);
                return [2 /*return*/];
            });
        }); });
        it('invokes callback with STARTING status after starting service', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = null;
                        service.addStatusSubscriber(function (newStatus) {
                            status = newStatus;
                        });
                        return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        expect(status).toBe(service_status_2.ServiceStatus.STARTING);
                        return [2 /*return*/];
                }
            });
        }); });
        it('invokes callback with NOT_RUNNING after stopping service', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = null;
                        service.addStatusSubscriber(function (newStatus) {
                            status = newStatus;
                        });
                        return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, service.stop()
                            // give some time for ProviderService to see this change
                        ];
                    case 2:
                        _a.sent();
                        // give some time for ProviderService to see this change
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 3:
                        // give some time for ProviderService to see this change
                        _a.sent();
                        clock.runToLast();
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 4:
                        _a.sent();
                        expect(status).toBe(service_status_2.ServiceStatus.NOT_RUNNING);
                        return [2 /*return*/];
                }
            });
        }); });
        it('invokes callback with NOT_RUNNING if service stops unexpectedly', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = null;
                        service.addStatusSubscriber(function (newStatus) {
                            status = newStatus;
                        });
                        return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, tequilapiClient.serviceStop('service id 1')
                            // give some time for ProviderService to see this change
                        ];
                    case 2:
                        _a.sent();
                        // give some time for ProviderService to see this change
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 3:
                        // give some time for ProviderService to see this change
                        _a.sent();
                        clock.runToLast();
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 4:
                        _a.sent();
                        expect(status).toBe(service_status_2.ServiceStatus.NOT_RUNNING);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not send status requests after being stopped', function () { return __awaiter(_this, void 0, void 0, function () {
            var serviceGetInvoked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, service.stop()
                            // give some time for ProviderService to see this change
                        ];
                    case 2:
                        _a.sent();
                        // give some time for ProviderService to see this change
                        clock.runAll();
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 3:
                        _a.sent();
                        clock.runToLast();
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 4:
                        _a.sent();
                        serviceGetInvoked = tequilapiClient.serviceGetInvoked;
                        // wait for a possible pulling
                        clock.runToLast();
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 5:
                        _a.sent();
                        expect(tequilapiClient.serviceGetInvoked).toEqual(serviceGetInvoked);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not invoke with the same status again', function () { return __awaiter(_this, void 0, void 0, function () {
            var statuses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statuses = [];
                        service.addStatusSubscriber(function (newStatus) {
                            statuses.push(newStatus);
                        });
                        return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        clock.runAll();
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 2:
                        _a.sent();
                        clock.runToLast();
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 3:
                        _a.sent();
                        expect(statuses.filter(function (s) { return s === service_status_2.ServiceStatus.STARTING; }).length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('invokes callback with STARTING status when subscribing to starting service', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        status = null;
                        service.addStatusSubscriber(function (newStatus) {
                            status = newStatus;
                        });
                        expect(status).toEqual(service_status_2.ServiceStatus.STARTING);
                        return [2 /*return*/];
                }
            });
        }); });
        // TODO: if service is running, we should do ServiceList and find service by service type
    });
    describe('.removeStatusSubscriber', function () {
        it('stops invoking callback on status change', function () { return __awaiter(_this, void 0, void 0, function () {
            var status, callback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = null;
                        callback = function (newStatus) {
                            status = newStatus;
                        };
                        service.addStatusSubscriber(callback);
                        status = null;
                        service.removeStatusSubscriber(callback);
                        return [4 /*yield*/, service.start(providerId, 'test service')];
                    case 1:
                        _a.sent();
                        expect(status).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
