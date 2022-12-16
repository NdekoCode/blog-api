import app from "./app.js";
import connectDD from "./configs/dbConfig.js";
import { httpServerConfig } from "./configs/httpConfig.js";
httpServerConfig(app);
connectDD();
