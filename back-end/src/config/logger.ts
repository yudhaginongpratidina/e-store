import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: process.env.EXPRESS_NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [new transports.Console()]
});

export default logger;