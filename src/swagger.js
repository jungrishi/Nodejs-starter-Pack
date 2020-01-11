import swaggerJSDoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Node API',
			version: '1.0.0',
			description: 'A test project for Node.js API',
			contact: {
				name: 'Swagger',
				email: 'example@domain.com',
			}
		},
		servers: [
			{
				url: `http://localhost:/${process.env.PORT}`,
			},
		],
	},
	apis: ['src/routes/index.js'], // only takes abs path; send a PR of the issue
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
