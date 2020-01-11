// /*eslint-disable*/

import './env';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';

import swaggerSpec from './swagger';
import logger, { logStream } from './logger';
import routes from './routes';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

// Sentry init
Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();
app.set('port', PORT);
app.set('host', HOST);

app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(morgan('tiny', { stream: logStream }));

// API routes
app.use('/api-docs', swaggerUi.serve);
app.get(
	'/api-docs',
	swaggerUi.setup(swaggerSpec, {
		explorer: true,
	}),
);

app.use('/users', routes);

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
	logger.info(`Server started at http://${app.get('host')}:${app.get('port')}`);
});
