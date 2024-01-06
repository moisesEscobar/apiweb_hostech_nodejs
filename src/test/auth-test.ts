
import { login, signup } from '../components/auth-component';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('USUARIOS-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{
        data: {
          name: "admin2",
          last_name: "escobar",
          second_surname: "martinez",
          phone_number: "9661006460",
          email: "admind2@gmail.com",
          password: "123456"
        }
      }],
      [{
        data: {
          name: "admin3",
          last_name: "escobar",
          second_surname: "martinez",
          phone_number: "9661006460",
          email: "admind3@gmail.com",
          password: "123456"
        }
      }],
    ])('Crear usuario', async (options) => {
      const req = { body: options.data };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await signup(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Registration completed successfully',
        content: expect.any(Object)
      });
    });

    test.each([
      [{
        data: {
          email: "admind@gmail.com",
          password: "123456"
        }
      }],
      [{
        data: {
          email: "admind1@gmail.com",
          password: "123456"
        }
      }],
    ])('Iniciar sesión', async (options) => {
      const req = { body: options.data };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await login(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Successfully logged in.',
        security_context: expect.any(Object)
      });
    });
  });

  describe('ERROR CASES (400)', () => {

    test.each([
      [{
        data: {
          name: "admin",
          last_name: "escobar",
          second_surname: "martinez",
          phone_number: "9661006460",
          email: "admind@gmail.com",
          password: "123456"
        }
      }],
      [{
        data: {name: "admin1",
          last_name: "escobar",
          second_surname: "Martínez",
          phone_number: "9661006460",
          email: "admind1@gmail.com",
          password: "123456"
        }
      }],
    ])('Crear usuario (DatosDuplicados)', async (options) => {
      const req = { body: options.data };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await signup(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'This e-mail has already been registered.'
      });
    });

    test.each([
      [{
        data: {
          name: "",
          last_name: "escobar",
          second_surname: "martinez",
          phone_number: "9661006460",
          email: "admind3@gmail.com",
          password: "123456"
        }
      }],
      [{
        data: {
          name: "admin1",
          last_name: "escobar",
          second_surname: "martinez",
          phone_number: "9661006460",
          email: "",
          password: "123456"
        }
      }],
    ])('Crear usuario (DatosRequeridos)', async (options) => {
      const req = { body: options.data };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await signup(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });


    test.each([
      [{
        data: {
          email: "admind1001@gmail.com",
          password: "123456"
        }
      }],
      [{
        data: {
          email: "admind1002@gmail.com",
          password: "123456"
        }
      }],
    ])('Iniciar sesión (NoExisteUsuario)', async (options) => {
      const req = { body: options.data };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await login(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Error login notfound'
      });
    });

    test.each([
      [{
        data: {
          email: "admind@gmail.com",
          password: "12345"
        }
      }],
      [{
        data: {
          email: "admind1@gmail.com",
          password: "12345"
        }
      }],
    ])('Iniciar sesión (ContraseñaIncorrecta)', async (options) => {
      const req = { body: options.data };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await login(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Incorrect password'
      });
    });
  });
}); 
