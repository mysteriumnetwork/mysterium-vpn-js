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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var lolex_1 = __importDefault(require("lolex"));
var threshold_executor_1 = require("../../../domain/looper/threshold-executor");
var utils_1 = require("../../utils/utils");
describe('ThresholdExecutor', function () {
    var funcDone;
    var thresholdDone;
    var clock;
    beforeAll(function () {
        clock = lolex_1.default.install();
    });
    afterAll(function () {
        clock.uninstall();
    });
    function tickWithDelay(duration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clock.tick(duration);
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var syncFunc = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            funcDone = true;
            return [2 /*return*/];
        });
    }); };
    var asyncFunc = function (duration) { return function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        funcDone = true;
                        resolve();
                    }, duration);
                })];
        });
    }); }; };
    beforeEach(function () {
        funcDone = false;
        thresholdDone = false;
    });
    function markThresholdDone() {
        thresholdDone = true;
    }
    describe('with sync function', function () {
        it('executes function', function () { return __awaiter(_this, void 0, void 0, function () {
            var executor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        executor = new threshold_executor_1.ThresholdExecutor(syncFunc, 10000);
                        executor.execute().then(markThresholdDone);
                        return [4 /*yield*/, utils_1.nextTick()
                            // not complete after 9s
                        ];
                    case 1:
                        _a.sent();
                        // not complete after 9s
                        return [4 /*yield*/, tickWithDelay(9000)];
                    case 2:
                        // not complete after 9s
                        _a.sent();
                        expect(funcDone).toEqual(true);
                        expect(thresholdDone).toEqual(false);
                        // complete after 10s
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 3:
                        // complete after 10s
                        _a.sent();
                        expect(thresholdDone).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with async function', function () {
        var fastAsyncFunc = asyncFunc(5000);
        it('executes function', function () { return __awaiter(_this, void 0, void 0, function () {
            var executor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        executor = new threshold_executor_1.ThresholdExecutor(fastAsyncFunc, 10000);
                        executor.execute().then(markThresholdDone);
                        // not complete after 9s
                        return [4 /*yield*/, tickWithDelay(9000)];
                    case 1:
                        // not complete after 9s
                        _a.sent();
                        expect(funcDone).toEqual(true);
                        expect(thresholdDone).toEqual(false);
                        // complete after 10s
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 2:
                        // complete after 10s
                        _a.sent();
                        expect(thresholdDone).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows canceling sleep', function () { return __awaiter(_this, void 0, void 0, function () {
            var executor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        executor = new threshold_executor_1.ThresholdExecutor(fastAsyncFunc, 10000);
                        executor.execute().then(markThresholdDone);
                        executor.cancel();
                        // complete after 5s
                        return [4 /*yield*/, tickWithDelay(5000)];
                    case 1:
                        // complete after 5s
                        _a.sent();
                        expect(thresholdDone).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        // TODO: canceling in the middle of sleep?
    });
    describe('with slow async function', function () {
        var slowAsyncFunc = asyncFunc(50000);
        it('executes function', function () { return __awaiter(_this, void 0, void 0, function () {
            var executor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        executor = new threshold_executor_1.ThresholdExecutor(slowAsyncFunc, 10000);
                        executor.execute().then(markThresholdDone);
                        // not complete after 40s
                        return [4 /*yield*/, tickWithDelay(40000)];
                    case 1:
                        // not complete after 40s
                        _a.sent();
                        expect(funcDone).toEqual(false);
                        expect(thresholdDone).toEqual(false);
                        // complete after 60s
                        return [4 /*yield*/, tickWithDelay(60000)];
                    case 2:
                        // complete after 60s
                        _a.sent();
                        expect(funcDone).toEqual(true);
                        expect(thresholdDone).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with function throwing error', function () {
        var executor;
        var mockError = new Error('Mock error');
        function errorFunc() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw mockError;
                });
            });
        }
        var capturedError = null;
        var captureError = function (err) {
            capturedError = err;
        };
        beforeEach(function () {
            executor = new threshold_executor_1.ThresholdExecutor(errorFunc, 1000, captureError);
            capturedError = null;
        });
        it('invokes error callback at next tick', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        executor.execute().then(markThresholdDone);
                        // no error initially
                        expect(thresholdDone).toBe(false);
                        expect(capturedError).toEqual(null);
                        // error is returned at next tick
                        return [4 /*yield*/, utils_1.nextTick()];
                    case 1:
                        // error is returned at next tick
                        _a.sent();
                        expect(thresholdDone).toBe(false);
                        expect(capturedError).toEqual(mockError);
                        return [2 /*return*/];
                }
            });
        }); });
        it('sleeps and throws error', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        executor.execute().then(markThresholdDone);
                        // no error initially
                        expect(thresholdDone).toBe(false);
                        expect(capturedError).toEqual(null);
                        // promise is done after sleeping
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 1:
                        // promise is done after sleeping
                        _a.sent();
                        expect(thresholdDone).toBe(true);
                        expect(capturedError).toEqual(mockError);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
