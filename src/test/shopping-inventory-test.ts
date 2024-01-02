
import { create, findAll} from '../components/shopping-inventory-component';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('COMPRAS_INVENTARIOS-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{ data: { product_id: 1,quantity:2, unit_price:10 }, userId: 1 }],
      [{ data: { product_id: 2,quantity:3, unit_price:20 }, userId: 1 }],
    ])('Crear compra y surtir inventario %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create shopping and inventory successfull',
        content: expect.any(Object)
      });
    });

    it('Obtener compras e inventarios surtidos', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAll(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get shoppings and inventories successfull',
        content: expect.arrayContaining([ expect.any(Object)])
      });
    });
  });
  describe('ERROR CASES (400)', () => {
    test.each([
      [{ data: { product_id: 1002,quantity:2, unit_price:10 }, userId: 1 }],
      [{ data: { product_id: 2002,quantity:3, unit_price:20 }, userId: 1 }],
    ])('(Error):Crear compra y surtir inventario (DatosNoExisten): %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
    it('(Error):Crear compra y surtir inventario (DatosRequeridos)', async () => {
      const req = { body: { product_id: '' }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: expect.any(String)
      });
    });
    
  });
}); 
