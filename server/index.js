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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./firebase/auth"));
const db_1 = __importDefault(require("./firebase/db"));
const collections_1 = __importDefault(require("./firebase/collections"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_2 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const cors_1 = __importDefault(require("cors"));
const plaid_1 = require("plaid");
require("dotenv/config");
const moment_1 = __importDefault(require("moment"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
const config = new plaid_1.Configuration({
    basePath: plaid_1.PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            "PLAID-CLIENT-ID": process.env.PLAID_ID,
            "PLAID-SECRET": process.env.SANDBOX_SECRET,
        }
    }
});
const plaid = new plaid_1.PlaidApi(config);
app.post("/get_access_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.uid;
    const publicToken = req.body.public_token;
    try {
        const docSnap = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid));
        if (docSnap.exists()) {
            if (docSnap.data().access_token) {
                res.json({
                    error: true,
                    errorMessage: "TOKEN_EXISTS"
                });
            }
            else {
                const { data } = yield plaid.itemPublicTokenExchange({ public_token: publicToken });
                const accessToken = data.access_token;
                try {
                    yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid), {
                        access_token: accessToken
                    });
                    res.json({
                        error: false,
                        errorMessage: "",
                        accessToken
                    });
                }
                catch (error) {
                    res.json({
                        error: true,
                        errorMessage: "INVALID_USER"
                    });
                }
            }
        }
    }
    catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        });
    }
}));
app.post("/get_link_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.uid;
    const docSnap = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid));
    if (docSnap.exists()) {
        const linkTokenResponse = yield plaid.linkTokenCreate({
            user: {
                client_user_id: uid
            },
            client_name: "IntelliSpend Financial App",
            products: [plaid_1.Products.Transactions],
            country_codes: [plaid_1.CountryCode.Us],
            language: "en"
        });
        res.json({
            link_token: linkTokenResponse.data.link_token
        });
    }
    else {
        res.json({
            error: true,
            errorMessage: "INVALID_USER"
        });
    }
}));
app.post("/create_user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docSnap = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Emails, req.body.email));
        if (docSnap.exists()) {
            res.json({
                error: true,
                errorMessage: "USER_EXISTS"
            });
        }
        else {
            try {
                const { user } = yield (0, auth_2.createUserWithEmailAndPassword)(auth_1.default, req.body.email, req.body.password);
                yield (0, firestore_1.setDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, user.uid), {
                    email: user.email
                });
                yield (0, firestore_1.setDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Emails, user.email), {
                    uid: user.uid
                });
                res.json({
                    error: false,
                    errorMessage: "",
                    uid: user.uid
                });
            }
            catch (error) {
                console.log(error);
                res.json({
                    error: true,
                    errorMessage: "SERVER_ERROR"
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            error: true,
            errorMessage: "Server is not responding. Please try again later."
        });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docSnap = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Emails, req.body.email));
        if (!docSnap.exists()) {
            res.json({
                error: true,
                errorMessage: "INVALID_USER"
            });
        }
        else {
            try {
                const { user } = yield (0, auth_2.signInWithEmailAndPassword)(auth_1.default, req.body.email, req.body.password);
                res.json({
                    error: false,
                    errorMessage: "",
                    uid: user.uid
                });
            }
            catch (error) {
                console.log(error);
                res.json({
                    error: true,
                    errorMessage: "INVALID_AUTH"
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        });
    }
}));
app.post("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docSnap = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, req.body.uid));
        if (docSnap.exists()) {
            let hasToken = false;
            if (docSnap.data().access_token) {
                hasToken = true;
            }
            res.json({
                error: false,
                errorMessage: "",
                budget: docSnap.data().budget,
                hasToken
            });
        }
        else {
            res.json({
                error: true,
                errorMessage: "User does not exist"
            });
        }
    }
    catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        });
    }
}));
app.post("/getTransactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const uid = req.body.uid;
    try {
        const docSnap = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid));
        const accessToken = (_a = docSnap.data()) === null || _a === void 0 ? void 0 : _a.access_token;
        const startDate = (0, moment_1.default)().startOf("month").format("YYYY-MM-DD");
        const endDate = (0, moment_1.default)().endOf("month").format("YYYY-MM-DD");
        try {
            const { data } = yield plaid.transactionsGet({
                access_token: accessToken,
                start_date: startDate,
                end_date: endDate
            });
            res.json({
                error: false,
                transactions: data.transactions
            });
        }
        catch (error) {
            res.json({
                error: true,
                errorMessage: "INVALID_TOKEN"
            });
        }
    }
    catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        });
    }
}));
app.post("/setBudget", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.uid;
    try {
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(db_1.default, collections_1.default.Users, uid), {
            budget: req.body.budget
        });
        res.json({
            error: false,
            errorMessage: ""
        });
    }
    catch (error) {
        res.json({
            error: true,
            errorMessage: "SERVER_ERROR"
        });
    }
}));
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
