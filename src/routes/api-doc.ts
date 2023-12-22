import { AuthComponent, InventoryComponent, SaleComponent, SupplierComponent } from '../components';
import { BrandComponent } from '../components';
import { LogComponent } from '../components';
import { ProductComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();


/**
 * @swagger
 * tags:
 *  -   name: users
 *      description: Detalles de usuarios
 *  -   name: brands
 *      description: Detalles del catalogo de marcas
 *  -   name: products
 *      description: Detalles del catalogo de productos
 *  -   name: suppliers
 *      description: Detalles del los proveedores
 *  -   name: inventories
 *      description: Detalles del inventario de productos
 *  -   name: sales
 *      description: Detalles de las ventas de los productos
 *  -   name: reports
 *      description: Reportes
 *  -   name: logs
 *      description: Detalles del histórico de acciones
 * /auth/login:
 *  post:
 *      tags:
 *          - users
 *      description: Se crean nuevos usuarios 
 *      tag: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/UserLogin'
 *      responses:
 *          200:
 *              description: (OK) Successfully logged in
 *          404:
 *              description: (ERROR) Bad Request
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/login', AuthComponent.login);
/**
 * @swagger
 * /auth/signup:
 *  post:
 *      tags:
 *          - users
 *      description: Inicio sesión de usuarios, se retorno un token de acceso
 *      tag: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: (OK)  Successfully signup
 *          400:
 *              description: (ERROR) Bad Request
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/signup', AuthComponent.signup);


/**
 * @swagger
 *  /brand/find_all:
 *  get:
 *      tags:
 *          - brands
 *      description: Obtener todas las marcas
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get brands successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', BrandComponent.findAll);
/**
 * @swagger
 *  /brand/find_all_with_products:
 *  get:
 *      tags:
 *          - brands
 *      description: Obtener todas las marcas con productos vinculados
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get brands successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/find_all_with_products', BrandComponent.findAllWithProducts);
/**
 *  @swagger
 *  /brand/find_one/{id}:
 *  get:
 *      tags:
 *          - brands
 *      description: Obtener una sola marca
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la marca a buscar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get brand successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findOne/:id', BrandComponent.findOne);
/**
 *  @swagger
 *  /brand/search/?name={name}:
 *  get:
 *      tags:
 *          - brands
 *      description: Buscar marcas por nombre
 *      parameters:
 *          - name: name
 *            in: path
 *            description: Nombre de la marca a buscar
 *            required: true
 *            example: 'gamesa'
 *            schema:
 *              type: string
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Searchs brands successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/search', BrandComponent.search);
/**
 * @swagger
 * /brand/create:
 *  post:
 *      tags:
 *          - brands
 *      description: Crear una mueva marca en el catalogo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Brand'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create brand successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', BrandComponent.create);
/**
 * @swagger
 * /brand/update/{id}:
 *  put:
 *      tags:
 *          - brands
 *      description: Actualizar una marca en el catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la marca a actualizar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Brand'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update brand successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', BrandComponent.update);
/**
 * @swagger
 * /brand/remove/{id}:
 *  delete:
 *      tags:
 *          - brands
 *      description: Eliminar una marca en el catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la marca a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete brand successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', BrandComponent.remove);
/**
 * @swagger
 * /brand/restore/{id}:
 *  put:
 *      tags:
 *          - brands
 *      description: Restaurar una marca del catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la marca a restaurar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore brand successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', BrandComponent.restore);








/**
 * @swagger
 *  /product/find_all:
 *  get:
 *      tags:
 *          - products
 *      description: Obtener todos los productos
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get products successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', ProductComponent.findAll);
/**
 *  @swagger
 *  /product/find_one/{id}:
 *  get:
 *      tags:
 *          - products
 *      description: Obtener un solo producto
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del producto
 *            required: true
 *            schema:
 *              type: integer
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get product successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          500:
 *              description: (ERROR) Internal Server Error
 *          401:
 *              description: (ERROR) Unauthorized
*/
router.get('/findOne/:id', ProductComponent.findOne);
/**
 *  @swagger
 *  /product/search/:
 *  get:
 *      tags:
 *          - products
 *      description: Buscar productos 
 *      parameters:
 *          - name: name
 *            in: query
 *            description: Nombre del producto
 *            example: 'marias'
 *            schema:
 *              type: string
 *          - name: key
 *            in: query
 *            description: Clave del producto
 *            example: ''
 *            schema:
 *              type: string
 *          - name: brand_id
 *            in: query
 *            description: Id de la marca
 *            example: 
 *            schema:
 *              type: integer
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            required: true
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha de creación
 *            example: '2023-12-19'
 *            required: true
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha de actualización
 *            example: '2023-12-20'
 *            required: true
 *            schema:
 *              type: string
 *          - name: page
 *            in: query
 *            description: Numero de la pagina
 *            example: 1
 *            schema:
 *              type: integer
 *          - name: page_size
 *            in: query
 *            description: Registros por pagina
 *            example: 2
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Searchs brands successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/search', ProductComponent.search);
/**
 * @swagger
 * /product/create:
 *  post:
 *      tags:
 *          - products
 *      description: Crear un nuevo producto en el catalogo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create product successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', ProductComponent.create);
/**
 * @swagger
 * /product/update/{id}:
 *  put:
 *      tags:
 *          - products
 *      description: Actualizar un producto del catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del producto a actualizar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update product successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', ProductComponent.update);
/**
 * @swagger
 * /product/remove/{id}:
 *  delete:
 *      tags:
 *          - products
 *      description: Eliminar un producto del catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del producto a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete product successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', ProductComponent.remove);
/**
 * @swagger
 * /product/restore/{id}:
 *  put:
 *      tags:
 *          - products
 *      description: Restaurar un producto del catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del producto a restaurar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore product successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', ProductComponent.restore);












/**
 * @swagger
 *  /supplier/find_all:
 *  get:
 *      tags:
 *          - suppliers
 *      description: Obtener todos los proveedores
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get suppliers successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', SupplierComponent.findAll);
/**
 *  @swagger
 *  /supplier/find_one/{id}:
 *  get:
 *      tags:
 *          - suppliers
 *      description: Obtener un proveedor
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del proveedor
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get supplier successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findOne/:id', SupplierComponent.findOne);
/**
 * @swagger
 * /supplier/create:
 *  post:
 *      tags:
 *          - suppliers
 *      description: Crear un nuevo proveedor
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Supplier'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create supplier successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', SupplierComponent.create);
/**
 * @swagger
 * /supplier/update/{id}:
 *  put:
 *      tags:
 *          - suppliers
 *      description: Actualizar un proveedor en el catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del proveedor a actualizar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Supplier'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update supplier successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', SupplierComponent.update);
/**
 * @swagger
 * /supplier/remove/{id}:
 *  delete:
 *      tags:
 *          - suppliers
 *      description: Eliminar un proveedor del catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del proveedor a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete supplier successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', SupplierComponent.remove);
/**
 * @swagger
 * /supplier/restore/{id}:
 *  put:
 *      tags:
 *          - suppliers
 *      description: Restaurar un proveedor
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del pproveedor
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore supplier successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', SupplierComponent.restore);





















/**
 * @swagger
 *  /inventory/find_all:
 *  get:
 *      tags:
 *          - inventories
 *      description: Obtener todos los inventarios
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get inventories successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', InventoryComponent.findAll);
/**
 *  @swagger
 *  /inventory/find_one/{id}:
 *  get:
 *      tags:
 *          - inventories
 *      description: Obtener un solo inventario
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del inventario
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get inventory successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findOne/:id', InventoryComponent.findOne);
/**
 * @swagger
 * /inventory/create:
 *  post:
 *      tags:
 *          - inventories
 *      description: Crear una muevo inventario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Inventory'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create inventory successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', InventoryComponent.create);
/**
 * @swagger
 * /inventory/update/{id}:
 *  put:
 *      tags:
 *          - inventories
 *      description: Actualizar un inventario
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del inventario
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Inventory'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update inventory successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', InventoryComponent.update);
/**
 * @swagger
 * /inventory/remove/{id}:
 *  delete:
 *      tags:
 *          - inventories
 *      description: Eliminar un inventario
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la marca a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete inventory successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', InventoryComponent.remove);
/**
 * @swagger
 * /inventory/restore/{id}:
 *  put:
 *      tags:
 *          - inventories
 *      description: Restaurar un inventario
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del inventario
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore inventory successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', InventoryComponent.restore);


























/**
 * @swagger
 *  /sale/find_all:
 *  get:
 *      tags:
 *          - sales
 *      description: Obtener todas las ventas
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get sales successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', SaleComponent.findAll);
/**
 *  @swagger
 *  /sale/find_one/{id}:
 *  get:
 *      tags:
 *          - sales
 *      description: Obtener una venta
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la venta a consultar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get sale successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findOne/:id', SaleComponent.findOne);
/**
 * @swagger
 * /sale/create:
 *  post:
 *      tags:
 *          - sales
 *      description: Crear una mueva venta
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Sale'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create sale successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', SaleComponent.create);
/**
 * @swagger
 * /sale/update/{id}:
 *  put:
 *      tags:
 *          - sales
 *      description: Actualizar una venta
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de  la venta a actualizar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Sale'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update sale successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', SaleComponent.update);
/**
 * @swagger
 * /sale/remove/{id}:
 *  delete:
 *      tags:
 *          - sales
 *      description: Eliminar una venta
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la venta a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete sale successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', SaleComponent.remove);








/**
 * @swagger
 *  /product/report_resume:
 *  get:
 *      tags:
 *          - reports
 *      description: Obtener los productos y detalles de ventas e inventarios
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get brands successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/report_resume', ProductComponent.reportResume);










/**
 * @swagger
 *  /log/find_all:
 *  get:
 *      tags:
 *          - logs
 *      description: Obtener todos los logs
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get logs successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', LogComponent.findAll);





/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the user name
 *              last_name:
 *                  type: string
 *                  description: the user last name
 *              second_surname:
 *                  type: string
 *                  description: the user second surname
 *              email:
 *                  type: string
 *                  description: the user email
 *              password:
 *                  type: string
 *                  description: the user password
 *          required:
 *              - name
 *              - email
 *              - password
 *          example:
 *              name: 'admin'
 *              last_name: 'escobar'
 *              second_surname: 'martinez'
 *              email: 'admind@gmail.com'
 *              password: '123456'
 *      UserLogin:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: the user email
 *              password:
 *                  type: string
 *                  description: the user password
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: 'admind@gmail.com'
 *              password: '123456'
 *      Brand:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the brand name
 *          required:
 *              - name
 *          example:
 *              name: 'gamesa'
 *      Product:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the product name
 *              key:
 *                  type: string
 *                  description: the product key
 *              price:
 *                  type: number
 *                  format: double
 *                  description: the price product
 *              reorder_point:
 *                  type: integer
 *                  description: the quantity of products but reorder
 *              brand_id:
 *                  type: integer
 *                  description: the product brand id
 *              supplier_id:
 *                  type: integer
 *                  description: the supplier id
 *          required:
 *              - name
 *              - key
 *              - price
 *              - reorder_point
 *              - brand_id
 *              - supplier_id
 *          example:
 *              name: 'Galletas maria gamesa'
 *              key: 'game'
 *              price: 15
 *              reorder_point: 15
 *              brand_id: 1
 *              supplier_id: 1
 *      Supplier:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the product name
 *          required:
 *              - name
 *          example:
 *              name: 'Soriana'
 *      Inventory:
 *          type: object
 *          properties:
 *              product_id:
 *                  type: integer
 *                  description: the product id
 *              quantity:
 *                  type: integer
 *                  description: the quantity of products in inventory
 *          required:
 *              - product_id
 *              - quantity
 *          example:
 *              product_id: 1
 *              quantity: 20
 *      Sale:
 *          type: object
 *          properties:
 *              product_id:
 *                  type: integer
 *                  description: the product id
 *              quantity:
 *                  type: number
 *                  description: the quantity of products in sale
 *          required:
 *              - product_id
 *              - quantity
 *          example:
 *              product_id: 1
 *              quantity: 5
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          name: x-access-token
 *          in: header
*/
/**
 *      response_error_400:
 *          title: Error [400]
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 400
 *              message:
 *                  type: string
 *                  example: "Error"
 *      response_sucess_200:
 *          title: Sucess [200]
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              message:
 *                  type: string
 *                  example: "Action successfully"
 */