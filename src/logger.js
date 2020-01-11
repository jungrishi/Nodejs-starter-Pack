import fs from 'fs';
import * as stream from 'stream';
import winston, { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const LOG_DIR = process.env.LOG_DIR || 'logs';
// const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

if (!fs.existsSync(LOG_DIR)) {
	fs.mkdirSync(LOG_DIR);
}

const dateFormat = () => new Date(Date.now()).toUTCString();

const logger = winston.createLogger({
	transports: [
		new transports.DailyRotateFile({
			format: format.combine(format.timestamp(), format.json()),
			level: 'debug',
			dirname: LOG_DIR,
			filename: '%DATE%-debug.log',
		}),
		new transports.DailyRotateFile({
			format: format.printf((info) => {
				const message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | `;

				return message;
			}),
			level: 'error',
			dirname: LOG_DIR,
			filename: '%DATE%-error.log',
		}),
		new transports.DailyRotateFile({
			format: format.printf((info) => {
				const message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | `;
				return message;
			}),
			level: 'info',
			dirname: LOG_DIR,
			filename: '%DATE%-info.log',
		}),
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
			level: 'info',
		}),
	],
});

export const logStream = new stream.Writable({
	write(message) {
		logger.info(message.toString());
	},
});

export default logger;
