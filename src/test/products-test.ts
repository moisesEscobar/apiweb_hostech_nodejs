
import { create, findAll, findOne, remove, restore, search, update } from '../components/product-component';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('PRODUCTOS-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    const p1 = getRandomInt(10, 1000);
    const p2 = getRandomInt(10, 1000);
    test.each([
      [{ data: { name: "Producto"+p1, sku:"P"+p1, price:25, reorder_point:20, brand_id:1, supplier_customer_id:1 }, userId: 1 }],
      [{ data: { name: "Producto"+p1, sku:"P"+p2, price:25, reorder_point:20, brand_id:1, supplier_customer_id:1 }, userId: 1 }],
    ])('Crear producto', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create product successfull',
        content: expect.any(Object)
      });
    });

    test.each([
      [{ query: { name: "Galleta" }, userId: 1 }],
      [{ query: { name: "Producto" }, userId: 1 }],
      [{ query: { sku: "P" }, userId: 1 }],
    ])('Buscar Productos', async (options) => {
      const req = { query: options.query, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await search(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Searchs product successfull',
        content: expect.arrayContaining([
          expect.any(Object)
        ])
      });
    });
    it('Obtener productos', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAll(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get products successfull',
        content: expect.arrayContaining([
          expect.any(Object)
        ])
      });
    });
    test.each([
      [{ params: {id:1}, userId: 1 }],
      [{ params: {id:2}, userId: 2 }],
    ])('Obtener producto', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get product successfull',
        content: expect.any(Object)
      });
    });
    test.each([
      [{ params: {id:3} , data: { description: "Producto actualizado"}, userId: 1 }],
      [{ params: {id:4} , data: { reorder_point: 25}, userId: 1 }],
    ])('Actualizar producto', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Update product successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Eliminar producto', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Delete product successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Restaurar producto', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Restore product successfull'
      });
    });
  });

  describe('ERROR CASES (400)', () => {
    let p1 = getRandomInt(10, 1000);
    let p2 = getRandomInt(10, 1000);
    test.each([
      [{ data: { name: "Producto"+p1, sku:"P1", price:25, reorder_point:20, brand_id:1, supplier_customer_id:1 }, userId: 1 }],
      [{ data: { name: "Producto"+p2, sku:"P2", price:25, reorder_point:20, brand_id:1, supplier_customer_id:1 }, userId: 1 }],
    ])('(Error):Crear producto (DatosDuplicados)', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Product sku exist"
      });
    });
    it('(Error):Crear producto (DatosRequeridos)', async () => {
      const req = { body: { name: "" }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
    p1 = getRandomInt(10, 1000);
    p2 = getRandomInt(10, 1000);
    test.each([
      [{ data: { name: "Producto"+p1, sku:"P"+p1, price:25, reorder_point:20, brand_id:1001, supplier_customer_id:1 }, userId: 1 }],
      [{ data: { name: "Producto"+p2, sku:"P"+p2, price:25, reorder_point:20, brand_id:1002, supplier_customer_id:1 }, userId: 1 }],
    ])('(Error):Crear producto (MarcaNoExiste)', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Brand not exist"
      });
    });
    p1 = getRandomInt(10, 1000);
    p2 = getRandomInt(10, 1000);
    test.each([
      [{ data: { name: "Producto"+p1, sku:"P"+p1, price:25, reorder_point:20, brand_id:1, supplier_customer_id:1001 }, userId: 1 }],
      [{ data: { name: "Producto"+p2, sku:"P"+p1, price:25, reorder_point:20, brand_id:1, supplier_customer_id:1002 }, userId: 1 }],
    ])('(Error):Crear producto (ProveedorNoExiste)', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Supplier not exist"
      });
    });

    test.each([
      [{ params: {id:1001}, userId: 1 }],
      [{ params: {id:1002}, userId: 2 }],
    ])('(Error):Obtener producto (IdNoExiste)', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Product not found'
      });
    });
    
    p1 = getRandomInt(10, 1000);
    p2 = getRandomInt(10, 1000);
    test.each([
      [{ params: {id:1001} , data: { description: "Actualizar Producto", price:25}, userId: 1 }],
      [{ params: {id:1002} , data: { description: "Actualizar Producto", price:25}, userId: 1 }],
    ])('(Error):Actualizar producto (IdNoExiste)', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Product not found"
      });
    });


    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Eliminar producto (IdNoExiste)', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Product not found'
      });
    });


    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Restaurar producto (IdNoExiste)', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Product not found"
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
