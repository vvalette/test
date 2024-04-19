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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProduct = exports.saveTicket = void 0;
const database_1 = require("../../db/database");
const saveTicket = (ticket) => __awaiter(void 0, void 0, void 0, function* () {
    const { order, vat, total } = ticket;
    const result = yield (0, database_1.query)('INSERT INTO tickets (order, vat, total) VALUES ($1, $2, $3)', [order, vat, total]);
    return result;
});
exports.saveTicket = saveTicket;
const saveProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, product_id, price } = product;
    const result = yield (0, database_1.query)('INSERT INTO products (product_name, product_id, price) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [product_name, product_id, price]);
    return result;
});
exports.saveProduct = saveProduct;
//# sourceMappingURL=ticket.service.js.map