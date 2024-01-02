
import { create, findAll, findOne, remove, restore, update } from '../components/payment-type-component';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('TIPOS_PAGOS-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{ data: { name: "Tarjeta Débito"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ data: { name: "Tarjeta Crédito"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('Crear tipo de pago: %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create payment type successfull',
        content: expect.objectContaining({
          created_at: expect.any(Date),
          deleted_at: null,
          id: expect.any(Number),
          name: expect.any(String),
          updated_at: expect.any(Date),
        })
      });
    });

    it('Obtener tipos de pagos', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAll(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get payment types successfull',
        content: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
            deleted_at: null
          })
        ])
      });
    });
    test.each([
      [{ params: {id:1}, userId: 1 }],
      [{ params: {id:2}, userId: 2 }],
    ])('Obtener tipo de pago: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get payment type successfull',
        content: expect.objectContaining({
          created_at: expect.any(Date),
          deleted_at: null,
          id: expect.any(Number),
          name: expect.any(String),
          updated_at: expect.any(Date),
        })
      });
    });
    test.each([
      [{ params: {id:3} , data: { name: "Tarjeta Débito"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ params: {id:4} , data: { name: "Tarjeta Crédito"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('Actualizar tipo de pago: %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Update payment type successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Eliminar tipo de pago: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Delete payment type successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Restaurar tipo de pago: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Restore payment type successfull'
      });
    });
  });

  describe('ERROR CASES (400)', () => {
    test.each([
      [{ data: { name: "Tarjeta Débito" }, userId: 1 }],
      [{ data: { name: "Tarjeta Crédito" }, userId: 1 }],
    ])('(Error):Crear tipo de pago (DatosDuplicados): %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "PaymentType name exist"
      });
    });
    it('(Error):Crear tipo de pago (DatosRequeridos)', async () => {
      const req = { body: { name: "" }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
    test.each([
      [{ params: {id:1001}, userId: 1 }],
      [{ params: {id:1002}, userId: 2 }],
    ])('(Error):Obtener tipo de pago (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'PaymentType not found'
      });
    });

    test.each([
      [{ params: {id:1001} , data: { name: "Tarjeta Débito"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ params: {id:1002} , data: { name: "Tarjeta Crédito"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('(Error):Actualizar tipo de pago (IdNoExiste):', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "PaymentType not found"
      });
    });

    test.each([
      [{ params: {id:10} , data: { name: "Tarjeta Débito1" }, userId: 1 }],
      [{ params: {id:11} , data: { name: "Tarjeta Crédito1" }, userId: 1 }],
    ])('(Error):Actualizar tipo de pago (DatosDuplicados): %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });

    /*test.each([
      [{ params: {id:1} , data: { name: "Tarjeta Crédito"+getRandomInt(10, 1000) }, userId: 1 }],
      // [{ params: {id:2} , data: { name: "Tarjeta Crédito"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('(Error):Actualizar tipo de pago (DatosAsociados): %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "The payment type cannot be updated because it has associated transactions"
      });
    }); */

    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Eliminar tipo de pago (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'PaymentType not found'
      });
    });

    /* it('(Error):Eliminar marca (DatosAsociados)', async () => {
      const req = { params: {id:1} , user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "The payment type cannot be eliminated because it has associated transactions"
      });
    }); */


    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Restaurar tipo de pago (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "PaymentType not found"
      });
    });
    it('(Error): Sin usuario enviado (NotTokenUser)', async () => {
      const req = { params:{id:1}, user: { id: '' } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
  });
}); 
