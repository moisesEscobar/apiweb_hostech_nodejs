
import { create, findAll, findOne, remove, restore, update } from '../components/inventory-component';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('INVENTARIOS-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{ data: { product_id:1 ,quantity:2 }, userId: 1 }],
      [{ data: { product_id:2 ,quantity:2 }, userId: 1 }]
    ])('Crear inventario: %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create inventory successfull',
        content: expect.any(Object)
      });
    });

    it('Obtener inventarios', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAll(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get inventories successfull',
        content: expect.arrayContaining([ expect.any(Object)])
      });
    });
    test.each([
      [{ params: {id:1}, userId: 1 }],
      [{ params: {id:2}, userId: 2 }],
    ])('Obtener inventario: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get inventory successfull',
        content: expect.any(Object)
      });
    });
    test.each([
      [{ params: {id:3} , data: { quantity:2 }, userId: 1 }],
      [{ params: {id:4} , data: { quantity:2  }, userId: 1 }],
    ])('Actualizar inventario: %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Update inventory successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Eliminar inventario: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Delete inventory successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Restaurar inventario: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Restore inventory successfull'
      });
    });
  });



  describe('ERROR CASES (400)', () => {
    it('(Error):Crear inventario (DatosRequeridos)', async () => {
      const req = { body: { product_id: "" }, user: { id: 1 } };
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
    ])('(Error):Obtener inventario (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Inventory not found'
      });
    });

    test.each([
      [{ params: {id:1001} , data: { quantity:2  }, userId: 1 }],
      [{ params: {id:1002} , data: { quantity:2  }, userId: 1 }],
    ])('(Error):Actualizar inventario (IdNoExiste):', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Inventory not found"
      });
    });

    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Eliminar inventario (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Inventory not found'
      });
    });


    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Restaurar inventario (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Inventory not found"
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
