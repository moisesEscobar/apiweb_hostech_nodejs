
/* 
describe('Marca-Crear', () => {
  describe('success cases', () => {
    const testCases = [
      [{ data: { name: "Marca4" }, userId: 1 }],
      [{ data: { name: "Marca5" }, userId: 2 }],
    ];
    test.each(testCases)('debe manejar la creación con opciones %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Create brand successfull',
        content: expect.objectContaining({
          created_at: expect.any(Date),
          deleted_at: null,
          id: expect.any(Number),
          name: expect.any(String),
          updated_at: expect.any(Date),
        })
      });
    });
  });
  describe('validation failures', () => {
    it('debe fallar si el nombre de la marca está vacío 1', async () => {
    });
    it('debe fallar si el nombre de la marca está vacío 2', async () => {
    });
  });
  describe('internal server errors', () => {
    it('debe manejar errores internos del servidor 1', async () => {
    });

    it('debe manejar errores internos del servidor 2', async () => {
    });
  });

}); */

/* // src/services/CalculadoraService.test.ts
import BrandService from '../services/brand-service';
import nock from 'nock';
import * as ShoppingInventoryComponent from '../components/brand-component';

describe('miFuncion', () => {
  it('hace una petición GET y procesa la respuesta', async () => {
    nock(process.env.HOST)
      .get('/brand/find_all')
      .reply(200, { respuesta: 'ok' }); // Simula una respuesta del servicio externo
    const resultado = await ShoppingInventoryComponent.findAll;
    expect(resultado).toEqual({ respuesta: 'ok' });
  });
});
/* describe('CalculadoraService', () => {
  it('debe sumar correctamente dos números', () => {
    expect(BrandService.findAll()).toBe();
  });
}); */

/* 
describe('CREATE', () => {
  it('hace una petición GET y procesa la respuesta', async () => {
    const req = {body:{"name":"gamesa5"},user: { id: 1} };
    const res = {json: jest.fn()};
    const next = jest.fn();
    await create(req as any, res as any, next as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'Create brand successfull',
      content: expect.objectContaining({
        created_at: expect.any(Date),
        deleted_at: null,
        id: expect.any(Number),
        name: expect.any(String),
        updated_at: expect.any(Date),
        
      })
    });
  });
}); */

/* describe('create controller', () => {
  it('debe crear una nueva marca y devolver una respuesta', async () => {
    // Mock de la respuesta de la creación de la marca
    const mockBrand = { name: "gamesa10" };
    jest.mock('../services/brand-service', () => ({
      BrandService: {
        create: jest.fn().mockImplementation(() => Promise.resolve(mockBrand))
      }
    }));
    const req = { body: mockBrand, user: { id: 1 } };
    const res = { json: jest.fn() };
    const next = jest.fn();
    await create(req as any, res as any, next as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'Create brand successfull',
      content: expect.objectContaining({
        created_at: expect.any(Date),
        deleted_at: null,
        id: expect.any(Number),
        name: expect.any(String),
        updated_at: expect.any(Date),
        
      })
    });
  });
}); */