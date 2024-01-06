
import { create, findAll, findAllWithProducts, findOne, remove, restore, search, update } from '../components/brand-component';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('MARCAS-ACCIONES', () => {
  describe('SUCCESS CASES (200)', () => {
    test.each([
      [{ data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('Crear marca: %o', async (options) => {
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

    test.each([
      [{ query: { name: "Gamesa" }, userId: 1 }],
      [{ query: { name: "Marca" }, userId: 1 }],
    ])('Buscar marcas: %o', async (options) => {
      const req = { query: options.query, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await search(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Searchs brands successfull',
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
    it('Obtener marcas asociadas a productos', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAllWithProducts(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get brands with products successfull',
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



    it('Obtener marcas', async () => {
      const req = { user: { id: 1 } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      await findAll(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get brands successfull',
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
    ])('Obtener marca: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Get brand successfull',
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
      [{ params: {id:3} , data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ params: {id:4} , data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('Actualizar marca: %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Update brand successfull'
      });
    });
    test.each([
      [{ params: {id:3} , userId: 1 }],
      [{ params: {id:4} , userId: 1 }],
    ])('Eliminar marca: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Delete brand successfull'
      });
    });
    test.each([
      [{ params: {id:5} , userId: 1 }],
      [{ params: {id:6} , userId: 1 }],
    ])('Restaurar marca: %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Restore brand successfull'
      });
    });
  });

  describe('ERROR CASES (400)', () => {
    test.each([
      [{ data: { name: "Marca1" }, userId: 1 }],
      [{ data: { name: "Marca2" }, userId: 1 }],
    ])('(Error):Crear marca (DatosDuplicados): %o', async (options) => {
      const req = { body: options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await create(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Brand name exist"
      });
    });
    it('(Error):Crear marca (DatosRequeridos)', async () => {
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
    ])('(Error):Obtener marca (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await findOne(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Brand not found'
      });
    });

    test.each([
      [{ params: {id:1001} , data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
      [{ params: {id:1002} , data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('(Error):Actualizar marca (IdNoExiste): %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Brand not found"
      });
    });

    test.each([
      [{ params: {id:10} , data: { name: "Marca1" }, userId: 1 }],
      [{ params: {id:11} , data: { name: "Marca2" }, userId: 1 }],
    ])('(Error):Actualizar marca (DatosDuplicados): %o', async (options) => {
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
      [{ params: {id:1} , data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
      // [{ params: {id:2} , data: { name: "Marca"+getRandomInt(10, 1000) }, userId: 1 }],
    ])('(Error):Actualizar marca (DatosAsociados): %o', async (options) => {
      const req = { params:options.params,body:options.data, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await update(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "The brand cannot be updated because it has associated products"
      });
    });

    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Eliminar marca (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: 'Brand not found'
      });
    });

    it('(Error):Eliminar marca (DatosAsociados)', async () => {
      const req = { params: {id:1} , user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await remove(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "The brand cannot be eliminated because it has associated products"
      });
    });


    test.each([
      [{ params: {id:1001} , userId: 1 }],
      [{ params: {id:1002} , userId: 1 }],
    ])('(Error):Restaurar marca (IdNoExiste): %o', async (options) => {
      const req = { params:options.params, user: { id: options.userId } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };
      const next = jest.fn();
      await restore(req as any, res as any, next as any);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Brand not found"
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
