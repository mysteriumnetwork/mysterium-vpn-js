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
var function_looper_1 = require("../../../domain/looper/function-looper");
var utils_1 = require("../../../domain/utils");
var utils_2 = require("../../utils/utils");
describe('FunctionLooper', function () {
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
                        return [4 /*yield*/, utils_2.nextTick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var emptyFunction = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); };
    describe('.start', function () {
        it('executes function multiple times with threshold', function () { return __awaiter(_this, void 0, void 0, function () {
            function increaseCounter() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        counter++;
                        return [2 /*return*/];
                    });
                });
            }
            var counter, looper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counter = 0;
                        looper = new function_looper_1.FunctionLooper(increaseCounter, 1000);
                        expect(counter).toEqual(0);
                        looper.start();
                        expect(counter).toEqual(1);
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 1:
                        _a.sent();
                        expect(counter).toEqual(2);
                        return [4 /*yield*/, tickWithDelay(2500)];
                    case 2:
                        _a.sent();
                        expect(counter).toEqual(3);
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 3:
                        _a.sent();
                        expect(counter).toEqual(4);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not starts second loop when invoked twice', function () {
            var counter = 0;
            function increaseCounter() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        counter++;
                        return [2 /*return*/];
                    });
                });
            }
            var looper = new function_looper_1.FunctionLooper(increaseCounter, 1000);
            looper.start();
            looper.start();
            expect(counter).toEqual(1);
        });
        it('executes function multiple times when function throws exception', function () { return __awaiter(_this, void 0, void 0, function () {
            function throwError() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        counter++;
                        throw new Error('mock error');
                    });
                });
            }
            var counter, looper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counter = 0;
                        looper = new function_looper_1.FunctionLooper(throwError, 1000);
                        expect(counter).toEqual(0);
                        looper.start();
                        expect(counter).toEqual(1);
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 1:
                        _a.sent();
                        expect(counter).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('.stop', function () {
        it('stops function execution', function () { return __awaiter(_this, void 0, void 0, function () {
            function increaseCounter() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        counter++;
                        return [2 /*return*/];
                    });
                });
            }
            var counter, looper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counter = 0;
                        looper = new function_looper_1.FunctionLooper(increaseCounter, 1000);
                        looper.start();
                        expect(counter).toEqual(1);
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 1:
                        _a.sent();
                        expect(counter).toEqual(2);
                        looper.stop();
                        return [4 /*yield*/, tickWithDelay(10000)];
                    case 2:
                        _a.sent();
                        expect(counter).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('waits for the last execution', function () { return __awaiter(_this, void 0, void 0, function () {
            function increaseCounter() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, utils_1.sleep(400)];
                            case 1:
                                _a.sent();
                                counter++;
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var counter, looper, stopped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counter = 0;
                        looper = new function_looper_1.FunctionLooper(increaseCounter, 1000);
                        looper.start();
                        stopped = false;
                        looper.stop().then(function () { stopped = true; });
                        expect(stopped).toEqual(false);
                        expect(counter).toEqual(0);
                        return [4 /*yield*/, tickWithDelay(400)];
                    case 1:
                        _a.sent();
                        expect(stopped).toEqual(true);
                        expect(counter).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not fail when invoked without starting', function () { return __awaiter(_this, void 0, void 0, function () {
            var looper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        looper = new function_looper_1.FunctionLooper(emptyFunction, 1000);
                        return [4 /*yield*/, looper.stop()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('.isRunning', function () {
        it('returns current looper state', function () { return __awaiter(_this, void 0, void 0, function () {
            var looper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        looper = new function_looper_1.FunctionLooper(emptyFunction, 1000);
                        expect(looper.isRunning()).toEqual(false);
                        looper.start();
                        expect(looper.isRunning()).toEqual(true);
                        looper.stop();
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 1:
                        _a.sent();
                        expect(looper.isRunning()).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('.onFunctionError', function () {
        it('registers function error handler', function () { return __awaiter(_this, void 0, void 0, function () {
            function throwError() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        counter++;
                        throw mockError;
                    });
                });
            }
            var mockError, counter, looper, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockError = new Error('mock error');
                        counter = 0;
                        looper = new function_looper_1.FunctionLooper(throwError, 1000);
                        error = null;
                        looper.onFunctionError(function (err) {
                            error = err;
                        });
                        expect(counter).toEqual(0);
                        expect(error).toBeNull();
                        looper.start();
                        expect(counter).toEqual(1);
                        expect(error).toBeNull();
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 1:
                        _a.sent();
                        expect(counter).toEqual(2);
                        expect(error).toEqual(mockError);
                        return [2 /*return*/];
                }
            });
        }); });
        it('registers multiple error handlers', function () { return __awaiter(_this, void 0, void 0, function () {
            function throwError() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        throw mockError;
                    });
                });
            }
            var mockError, looper, error1, error2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockError = new Error('mock error');
                        looper = new function_looper_1.FunctionLooper(throwError, 1000);
                        error1 = null;
                        error2 = null;
                        looper.onFunctionError(function (err) {
                            error1 = err;
                        });
                        looper.onFunctionError(function (err) {
                            error2 = err;
                        });
                        expect(error1).toBeNull();
                        expect(error2).toBeNull();
                        looper.start();
                        return [4 /*yield*/, tickWithDelay(1000)];
                    case 1:
                        _a.sent();
                        expect(error1).toEqual(mockError);
                        expect(error2).toEqual(mockError);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
