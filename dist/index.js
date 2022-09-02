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
const http_1 = require("@tauri-apps/api/http");
const settle_1 = __importDefault(require("axios/lib/core/settle"));
function axiosTauriAdapter(config) {
    return new Promise(function (resolve, reject) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, http_1.fetch)(config.url, {
                method: (_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
                timeout: config.timeout || 99999999,
                headers: config.headers,
                responseType: responseTypeParser(config.responseType),
                query: config.params,
                body: bodyParser(config.data),
            });
            let resData;
            try {
                resData = JSON.parse(response.data);
            }
            catch (e) {
                resData = response.data;
            }
            (0, settle_1.default)(resolve, reject, {
                data: resData,
                status: response.status,
                statusText: "",
                headers: response.headers,
                config,
                request: {},
            });
        });
    });
}
exports.default = axiosTauriAdapter;
const responseTypeParser = (responseType) => {
    switch (responseType) {
        case "arraybuffer":
            return http_1.ResponseType.Binary;
        case "blob":
            return http_1.ResponseType.Binary;
        case "document":
            return http_1.ResponseType.Text;
        case "json":
            return http_1.ResponseType.JSON;
        case "text":
            return http_1.ResponseType.Text;
        case "stream":
            return http_1.ResponseType.Binary;
        default:
            return http_1.ResponseType.Text;
    }
};
const bodyParser = (data) => {
    if (typeof data === "string") {
        return { type: "Text", payload: data };
    }
    else if (typeof data === "object") {
        return { type: "JSON", payload: JSON.stringify(data) };
    }
    else {
        return undefined;
    }
};
