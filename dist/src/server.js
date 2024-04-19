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
const body_parser_1 = __importDefault(require("body-parser"));
const ticket_service_1 = require("./tickets/ticket.service");
const database_1 = require("../db/database");
const app = (0, express_1.default)();
app.use(body_parser_1.default.text());
// create ticket 
app.post('/ticket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lines = req.body.trim().split('\n');
        const ticket = {};
        const products = [];
        lines.forEach((line) => {
            const [key, value] = line.split(': ');
            if (key) {
                if (key === 'product') {
                    const [product_name, product_id, price] = value.split(',');
                    products.push({ product_name, product_id, price });
                }
                else {
                    ticket[key] = value;
                }
            }
        });
        ticket.products = products;
        yield (0, ticket_service_1.saveTicket)(ticket);
        products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, ticket_service_1.saveProduct)(product); }));
        res.status(200).send('Ticket saved');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error saving ticket');
    }
}));
app.listen(3000, () => {
    console.log('Initializing database');
    (0, database_1.initDb)();
    console.log('Server listening on port 3000');
});
//# sourceMappingURL=server.js.map