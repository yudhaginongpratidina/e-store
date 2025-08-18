import 'dotenv/config';
import app from "./app";
import logger from "./config/logger";

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});