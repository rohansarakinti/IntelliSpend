"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const auth_1 = require("firebase/auth");
const auth = (0, auth_1.getAuth)(config_1.default);
exports.default = auth;
