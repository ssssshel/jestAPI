const request = require('supertest')
const app = require('../api')
const {nanoid} = require('nanoid')

// al emplear un servidor se tienen que configurar las pruebas antes y despues de reaizarlas
let testServer
beforeAll(() => {
	testServer = app.listen(4000)
})

afterAll((done) => {
	testServer.close(done)
})

// supertest permite hacer consultas http desde la interfaz de testing

describe('GET /api/users', () => {
	test('should return all users', async () => {
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

describe('GET /api/users/:id', () => {
	test('should get an exercise', async() => {
		const response  = await request(app).get('/api/users/1')
		expect(response.error).toBe(false);
		expect(response.status).toBe(200);
		expect(response.body.body).not.toBeNull();
		expect(response.body.body.id).toBe("1")
	});
});

describe('POST /api/users', () => {
	test('should POST a new user', async() => {
		const userId = nanoid()
		let user = {
			id: userId,
			name: 'Nuevo usuario',
			username: 'nuevo_usuario'
		}
		const response = await request(app).post('/api/users').send(user)
		expect(response.error).toBe(false);
		expect(response.status).toBe(200);
		expect(response.body.body).not.toBeNull();
		expect(response.body.body.id).toBe(userId);
	});
});