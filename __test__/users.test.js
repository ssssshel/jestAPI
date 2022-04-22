const request = require('supertest')
const app = require('../api')
const nanoid = require('nanoid')

// supertest permite hacer consultas http desde la interfaz de testing

describe('GET /api/users', () => {
	test('should return all users', () => {
		const response = await request(app).get('/api/users')

		// se testea que error sea false
		expect(response.error).toBe(false)

		// se testea que el estado del response sea 200
		expect(response.status).toBe(200);

		// se testea que el array exista
		expect(response.body.body).not.toBeNull();

		// se testea el tipo
		expect(Array.isArray(response.body.body)).toBe(true);

		// se testea la longitud del array
		expect(response.body.body.length).toBe(2);
	});
});