"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./firebase/auth"));
var db_1 = __importDefault(require("./firebase/db"));
var collections_1 = __importDefault(require("./firebase/collections"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var auth_2 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var cors_1 = __importDefault(require("cors"));
var plaid_1 = require("plaid");
require("dotenv/config");
var moment_1 = __importDefault(require("moment"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
var config = new plaid_1.Configuration({
    basePath: plaid_1.PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            "PLAID-CLIENT-ID": process.env.PLAID_ID,
            "PLAID-SECRET": process.env.SANDBOX_SECRET,
        }
    }
});
var plaid = new plaid_1.PlaidApi(config);
app.post("/get_access_token", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, publicToken, docSnap, data, accessToken, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = req.body.uid;
                publicToken = req.body.public_token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid))];
            case 2:
                docSnap = _a.sent();
                if (!docSnap.exists()) return [3 /*break*/, 8];
                if (!docSnap.data().access_token) return [3 /*break*/, 3];
                res.json({
                    error: true,
                    errorMessage: "TOKEN_EXISTS"
                });
                return [3 /*break*/, 8];
            case 3: return [4 /*yield*/, plaid.itemPublicTokenExchange({ public_token: publicToken })];
            case 4:
                data = (_a.sent()).data;
                accessToken = data.access_token;
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, (0, firestore_1.updateDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid), {
                        access_token: accessToken
                    })];
            case 6:
                _a.sent();
                res.json({
                    error: false,
                    errorMessage: "",
                    accessToken: accessToken
                });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                res.json({
                    error: true,
                    errorMessage: "INVALID_USER"
                });
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _a.sent();
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
app.post("/get_link_token", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, docSnap, linkTokenResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = req.body.uid;
                return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid))];
            case 1:
                docSnap = _a.sent();
                if (!docSnap.exists()) return [3 /*break*/, 3];
                return [4 /*yield*/, plaid.linkTokenCreate({
                        user: {
                            client_user_id: uid
                        },
                        client_name: "IntelliSpend Financial App",
                        products: [plaid_1.Products.Transactions],
                        country_codes: [plaid_1.CountryCode.Us],
                        language: "en"
                    })];
            case 2:
                linkTokenResponse = _a.sent();
                res.json({
                    link_token: linkTokenResponse.data.link_token
                });
                return [3 /*break*/, 4];
            case 3:
                res.json({
                    error: true,
                    errorMessage: "INVALID_USER"
                });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/create_user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docSnap, user, error_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Emails, req.body.email))];
            case 1:
                docSnap = _a.sent();
                if (!docSnap.exists()) return [3 /*break*/, 2];
                res.json({
                    error: true,
                    errorMessage: "USER_EXISTS"
                });
                return [3 /*break*/, 7];
            case 2:
                _a.trys.push([2, 6, , 7]);
                return [4 /*yield*/, (0, auth_2.createUserWithEmailAndPassword)(auth_1.default, req.body.email, req.body.password)];
            case 3:
                user = (_a.sent()).user;
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, user.uid), {
                        email: user.email
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Emails, user.email), {
                        uid: user.uid
                    })];
            case 5:
                _a.sent();
                res.json({
                    error: false,
                    errorMessage: "",
                    uid: user.uid
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.log(error_3);
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                });
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_4 = _a.sent();
                console.log(error_4);
                res.json({
                    error: true,
                    errorMessage: "Server is not responding. Please try again later."
                });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docSnap, user, error_5, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Emails, req.body.email))];
            case 1:
                docSnap = _a.sent();
                if (!!docSnap.exists()) return [3 /*break*/, 2];
                res.json({
                    error: true,
                    errorMessage: "INVALID_USER"
                });
                return [3 /*break*/, 5];
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, auth_2.signInWithEmailAndPassword)(auth_1.default, req.body.email, req.body.password)];
            case 3:
                user = (_a.sent()).user;
                res.json({
                    error: false,
                    errorMessage: "",
                    uid: user.uid
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                res.json({
                    error: true,
                    errorMessage: "INVALID_AUTH"
                });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_6 = _a.sent();
                console.log(error_6);
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.post("/getData", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docSnap, hasToken, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, req.body.uid))];
            case 1:
                docSnap = _a.sent();
                if (docSnap.exists()) {
                    hasToken = false;
                    if (docSnap.data().access_token) {
                        hasToken = true;
                    }
                    res.json({
                        error: false,
                        errorMessage: "",
                        budget: docSnap.data().budget,
                        hasToken: hasToken
                    });
                }
                else {
                    res.json({
                        error: true,
                        errorMessage: "User does not exist"
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/getTransactions", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, docSnap, accessToken, startDate, endDate, data, error_8, error_9;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                uid = req.body.uid;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid))];
            case 2:
                docSnap = _b.sent();
                accessToken = (_a = docSnap.data()) === null || _a === void 0 ? void 0 : _a.access_token;
                startDate = (0, moment_1.default)().startOf("month").format("YYYY-MM-DD");
                endDate = (0, moment_1.default)().endOf("month").format("YYYY-MM-DD");
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, plaid.transactionsGet({
                        access_token: accessToken,
                        start_date: startDate,
                        end_date: endDate
                    })];
            case 4:
                data = (_b.sent()).data;
                res.json({
                    error: false,
                    transactions: data.transactions
                });
                return [3 /*break*/, 6];
            case 5:
                error_8 = _b.sent();
                res.json({
                    error: true,
                    errorMessage: "INVALID_TOKEN"
                });
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_9 = _b.sent();
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post("/setBudget", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = req.body.uid;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, firestore_1.updateDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid), {
                        budget: req.body.budget
                    })];
            case 2:
                _a.sent();
                res.json({
                    error: false,
                    errorMessage: ""
                });
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(8080, function () {
    console.log("Server running on http://localhost:8080");
});
