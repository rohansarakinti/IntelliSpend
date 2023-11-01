"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var firestore_1 = require("firebase/firestore");
var db = (0, firestore_1.getFirestore)(config_1.default);
exports.default = db;
