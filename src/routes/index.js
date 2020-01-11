import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
router.get('/', (req, res) => {
	res.send('user api');
	// myUndefined();
});

/**
 * @swagger
 * /users/home:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
router.get('/home', (req, res) => {
	res.send('users home api');
});

export default router;
