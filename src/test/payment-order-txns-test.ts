
import { create , findAll , findOne, remove, restore, update } from '../components/payment-order-txn-component';
import { create as createPot, findAll as findAllPot} from '../components/payment-order-component';

describe('ORDENES_DE_PAGO-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{ data: { shopping_id: 1,payment_date:'2024-01-01', status: 'pending'}, userId: 1 }],
      [{ data: { shopping_id: 2,payment_date:'2024-01-01', status: 'pending'}, userId: 1 }],
    ])('Crear orden de pago a compras de proveedores ', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await createPot(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create payment order purchase successfull',
        content: expect.any(Object)
      });
    });

    it('Obtener ordenes de pagos a compras de proveedores', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAllPot(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get payment order purchase successfull',
        content: expect.arrayContaining([ expect.any(Object)])
      });
    });
  });
  describe('ERROR CASES (400)', () => {
    test.each([
      [{ data: { shopping_id: 1001,payment_date:'2024-01-01', status: 'pending'}, userId: 1 }],
      [{ data: { shopping_id: 1002,payment_date:'2024-01-01', status: 'pending'}, userId: 1 }],
    ])('(Error):Crear orden de pago a compras de proveedores (DatosNoExisten):', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await createPot(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
    it('(Error):Crear orden de pago a compras de proveedores (DatosRequeridos)', async () => {
      const req = { body: { shopping_id: "" }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await createPot(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
    
  });
}); 

describe('TRANSACIONES_ORDENES_DE_PAGO-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{ data: { amount: 100,user_id:1,payment_type_id:1,payment_order_id:1,supplier_customer_id:1,status:'pending'}, userId: 1 }],
      [{ data: { amount: 100,user_id:1,payment_type_id:2,payment_order_id:2,supplier_customer_id:2,status:'process'}, userId: 1 }],
      [{ data: { amount: 100,user_id:1,payment_type_id:2,payment_order_id:1,supplier_customer_id:2,status:'pending'}, userId: 1 }],
      [{ data: { amount: 100,user_id:1,payment_type_id:1,payment_order_id:2,supplier_customer_id:2,status:'process'}, userId: 1 }]
    ])('Crear transacciones de ordenes de pago:', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create payment_order successfull',
        content: expect.any(Object)
      });
    });

    it('Obtener transacciones ordenes de pago', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAll(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get payment order txns successfull',
        content: expect.arrayContaining([ expect.any(Object)])
      });
    });
    test.each([
      [{ params: {id:1}, userId: 1 }],
      [{ params: {id:2}, userId: 2 }],
    ])('Obtener una transaccion de ordenes de pago:', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get payment order txn successfull',
        content: expect.any(Object)
      });
    });
    test.each([
      [{ params: {id:1} , data: { status: "completed" }, userId: 1 }],
      [{ params: {id:2} , data: { status: "completed" }, userId: 1 }],
    ])('Actualizar una transacción de orden de pago:', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Update payment order txn successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Eliminar una transacción de orden de pago: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Delete payment_order_txn successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Restaurar una transacción de orden de pago: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Restore payment_order_txn successfull'
      });
    });
  });



  describe('ERROR CASES (400)', () => {
    test.each([
      [{ data: { amount: 100,user_id:1,payment_type_id:1,payment_order_id:1,supplier_customer_id:1,status:'pending'}, userId: 1 }],
      [{ data: { amount: 100,user_id:1,payment_type_id:2,payment_order_id:2,supplier_customer_id:2,status:'process'}, userId: 1 }],
    ])('(Error):Crear transaciones de ordenes de pago (DatosDuplicados):', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
    it('(Error):Crear transaciones de ordenes de pago  (DatosRequeridos)', async () => {
      const req = { body: { payment_type_id: "" }, user: { id: 1 } };
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
    ])('(Error):Obtener transaciones de ordenes de pago (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Payment order txn not found'
      });
    });

    test.each([
      [{ params: {id:1001} , data: { status:'refunded' }, userId: 1 }],
      [{ params: {id:1002} , data: { status:'refunded' }, userId: 1 }],
    ])('(Error):Actualizar transaciones de ordenes de pago (IdNoExiste):', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Payment order txn not found"
      });
    });


    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Eliminar transacción de orden de pago (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Payment order txn not found'
      });
    });




    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Restaurar transacción de orden de pago (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Payment order txn not found"
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
