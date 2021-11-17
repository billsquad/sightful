"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "localhost:3000", credentials: true }));
const PORT = 5000;
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is listening at http:localhost:${PORT}`)))
    .catch((error) => console.error(error.message));
//# sourceMappingURL=index.js.map