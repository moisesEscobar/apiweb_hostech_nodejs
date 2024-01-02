
import { create, findAll, findOne, remove, restore, update } from '../components/supplier-component';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('PROVEEDORES_CLIENTES-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{ data: { name: "Proveedor"+getRandomInt(10, 1000) ,type_user:'supplier'}, userId: 1 }],
      [{ data: { name: "Proveedor"+getRandomInt(10, 1000) ,type_user:'supplier'}, userId: 1 }],
    ])('Crear proveedor: %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create supplier successfull',
        content: expect.any(Object)
      });
    });

    it('Obtener proveedores o clientes', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAll(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get suppliers successfull',
        content: expect.arrayContaining([ expect.any(Object)])
      });
    });
    test.each([
      [{ params: {id:1}, userId: 1 }],
      [{ params: {id:2}, userId: 2 }],
    ])('Obtener proveedor: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get supplier successfull',
        content: expect.any(Object)
      });
    });
    test.each([
      [{ params: {id:3} , data: { name: "Proveedor"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ params: {id:4} , data: { name: "Proveedor"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('Actualizar proveedor: %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Update supplier successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Eliminar proveedor o cliente: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Delete supplier successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Restaurar proveedor o cliente: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Restore supplier successfull'
      });
    });
  });



  describe('ERROR CASES (400)', () => {
    test.each([
      [{ data: { name: "Proveedor1",type_user:'supplier'}, userId: 1 }],
      [{ data: { name: "Proveedor1",type_user:'supplier'}, userId: 1 }]
    ])('(Error):Crear proveedor (DatosDuplicados): %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Supplier name exist"
      });
    });
    it('(Error):Crear proveedor (DatosRequeridos)', async () => {
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
    ])('(Error):Obtener proveedor (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Supplier not found'
      });
    });

    test.each([
      [{ params: {id:1001} , data: { name: "Proveedor"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ params: {id:1002} , data: { name: "Proveedor"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('(Error):Actualizar proveedor (IdNoExiste):', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Supplier not found"
      });
    });

    test.each([
      [{ params: {id:10} , data: { name: "Proveedor1" }, userId: 1 }],
      [{ params: {id:11} , data: { name: "Proveedor2" }, userId: 1 }],
    ])('(Error):Actualizar proveedor (DatosDuplicados): %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });

    test.each([
      [{ params: {id:1} , data: { name: "Proveedor"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('(Error):Actualizar proveedor (DatosAsociados): %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "The supplier cannot be updated because it has associated inventory"
      });
    }); 

    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Eliminar proveedor (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Supplier not found'
      });
    });

    it('(Error):Eliminar proveedor (DatosAsociados)', async () => {
      const req = { params: {id:1} , user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "The supplier cannot be eliminated because it has associated inventory"
      });
    });


    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Restaurar proveedor (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Supplier not found"
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
