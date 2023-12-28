import { AuthComponent, InventoryComponent, SaleComponent, PaymentTypeComponent,PaymentOrderComponent,PaymentOrderTxnComponent,PurchaseOrderComponent,ShoppingComponent } from '../components';
import { BrandComponent } from '../components';
import { LogComponent } from '../components';
import { ProductComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();


/**
 * @swagger
 * tags:
 *  -   name: Usuarios
 *      description: Detalles de los usuarios
 *  -   name: Marcas
 *      description: Detalles del catalogo de marcas
 *  -   name: Proveedores
 *      description: Detalles del los proveedores
 *  -   name: Tipo de pagos
 *      description: Detalles del catalogo de tipo de pagos
 *  -   name: Productos
 *      description: Detalles del catalogo de productos
 *  -   name: Inventarios
 *      description: Detalles del inventario de productos
 *  -   name: Ventas
 *      description: Detalles de las ventas de los productos (Los productos que el cliente compra)
 *  -   name: Compras a proveedores
 *      description: Las compras de recursos a proveedores
 *  -   name: Ordenes de pago
 *      description:    Las ordenes de pago generadas para los proveedores, estas pueden tener una o mas compras
 *  -   name: Pedidos
 *      description: Es la tabla que relaciona las compras a los proveedores con sus respectivas ordenes de pago
 *  -   name: Transacciones de las ordenes de pago
 *      description: Es el la tabla donde se registran los pagos y la culminación de la compra y las ordenes de pago
 *  -   name: Reportes
 *      description: Diversos reportes
 *  -   name: Registros de acciones
 *      description: Detalles del histórico de acciones
 * /auth/login:
 *  post:
 *      tags:
 *          - Usuarios
 *      description: Se crean nuevos usuarios 
 *      tag: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/InicioDeSesion'
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
 *          - Usuarios
 *      description: Inicio sesión de usuarios, se retorno un token de acceso
 *      tag: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Usuario'
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
 *          - Marcas
 *      summary: Obtener todas las marcas
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
 *          - Marcas
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
 *          - Marcas
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
 *          - Marcas
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
 *          - Marcas
 *      description: Crear una mueva marca en el catalogo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Marca'
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
 *          - Marcas
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
 *                      $ref: '#/components/schemas/Marca'
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
 *          - Marcas
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
 *          - Marcas
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
 *          - Productos
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
 *          - Productos
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
 *          - Productos
 *      description: Buscar productos 
 *      parameters:
 *          - name: name
 *            in: query
 *            description: Nombre del producto
 *            example: 'marias'
 *            schema:
 *              type: string
 *          - name: sku
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
 *          - Productos
 *      description: Crear un nuevo producto en el catalogo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Producto'
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
 *          - Productos
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
 *                      $ref: '#/components/schemas/Producto'
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
 *          - Productos
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
 *          - Productos
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
 *          - Proveedores
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
router.get('/findAll', PaymentTypeComponent.findAll);
/**
 *  @swagger
 *  /supplier/find_one/{id}:
 *  get:
 *      tags:
 *          - Proveedores
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
router.get('/findOne/:id', PaymentTypeComponent.findOne);
/**
 * @swagger
 * /supplier/create:
 *  post:
 *      tags:
 *          - Proveedores
 *      description: Crear un nuevo proveedor
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Proveedor'
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
router.post('/create', PaymentTypeComponent.create);
/**
 * @swagger
 * /supplier/update/{id}:
 *  put:
 *      tags:
 *          - Proveedores
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
 *                      $ref: '#/components/schemas/Proveedor'
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
router.put('/update/:id', PaymentTypeComponent.update);
/**
 * @swagger
 * /supplier/remove/{id}:
 *  delete:
 *      tags:
 *          - Proveedores
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
router.delete('/remove/:id', PaymentTypeComponent.remove);
/**
 * @swagger
 * /supplier/restore/{id}:
 *  put:
 *      tags:
 *          - Proveedores
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
router.put('/restore/:id', PaymentTypeComponent.restore);





















/**
 * @swagger
 *  /inventory/find_all:
 *  get:
 *      tags:
 *          - Inventarios
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
 *          - Inventarios
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
 *          - Inventarios
 *      description: Crear una muevo inventario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Inventario'
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
 *          - Inventarios
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
 *                      $ref: '#/components/schemas/Inventario'
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
 *          - Inventarios
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
 *          - Inventarios
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
 *          - Ventas
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
 *          - Ventas
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
 *          - Ventas
 *      description: Crear una mueva venta
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Venta'
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
 *          - Ventas
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
 *                      $ref: '#/components/schemas/Venta'
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
 *          - Ventas
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
 *          - Reportes
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
 *  @swagger
 *  /payment_type/find_all:
 *  get:
 *      tags:
 *          - Tipo de pagos
 *      description: Obtener todos los tipos de pagos
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get payment types successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', PaymentTypeComponent.findAll);
/**
 *  @swagger
 *  /payment_type/find_one/{id}:
 *  get:
 *      tags:
 *          - Tipo de pagos
 *      description: Obtener un tipo de pago
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del tipo de pago
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get payment type successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findOne/:id', PaymentTypeComponent.findOne);
/**
 *  @swagger
 * /payment_type/create:
 *  post:
 *      tags:
 *          - Tipo de pagos
 *      description: Crear un nuevo tipo de pago
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/TipoDePago'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create payment type successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', PaymentTypeComponent.create);
/**
 *  @swagger
 * /payment_type/update/{id}:
 *  put:
 *      tags:
 *          - Tipo de pagos
 *      description: Actualizar un tipo de pago en el catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del tipo de pago a actualizar
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
 *                      $ref: '#/components/schemas/TipoDePago'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update payment type successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', PaymentTypeComponent.update);
/**
 *  @swagger
 * /payment_type/remove/{id}:
 *  delete:
 *      tags:
 *          - Tipo de pagos
 *      description: Eliminar un tipo de pago del catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del tipo de pago a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete type payment successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', PaymentTypeComponent.remove);
/**
 *  @swagger
 * /payment_type/restore/{id}:
 *  put:
 *      tags:
 *          - Tipo de pagos
 *      description: Restaurar un tipo de pago
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del tipo de pago
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore type payment successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', PaymentTypeComponent.restore);




































/**
 * @swagger
 *  /payment_order/find_all:
 *  get:
 *      tags:
 *          - Ordenes de pago
 *      description: Obtener todas las ordenes de pago
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get payment orders successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', PaymentOrderComponent.findAll);
/**
 *  @swagger
 *  /payment_order/find_one/{id}:
 *  get:
 *      tags:
 *          - Ordenes de pago
 *      description: Obtener una orden de pago
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la orden de pago
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get payment order successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findOne/:id', PaymentOrderComponent.findOne);
/**
 *  @swagger
 * /payment_order/create:
 *  post:
 *      tags:
 *          - Ordenes de pago
 *      description: Crear un nuevo tipo de pago
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/TipoDePago'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create payment type successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', PaymentOrderComponent.create);
/**
 *  @swagger
 * /payment_order/update/{id}:
 *  put:
 *      tags:
 *          - Ordenes de pago
 *      description: Actualizar una orden de pago
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la orden de pago a actualizar
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
 *                      $ref: '#/components/schemas/OrdenesDePago'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update payment order successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', PaymentOrderComponent.update);
/**
 *  @swagger
 * /payment_order/remove/{id}:
 *  delete:
 *      tags:
 *          - Ordenes de pago
 *      description: Eliminar un tipo de pago del catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del tipo de pago a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete type payment successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', PaymentOrderComponent.remove);
/**
 *  @swagger
 * /payment_order/restore/{id}:
 *  put:
 *      tags:
 *          - Ordenes de pago
 *      description: Restaurar una orden de pago
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id dee la orden de pago
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore type payment order successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', PaymentOrderComponent.restore);






/**
 *  @swagger
 *  /payment_order_txn/find_all:
 *  get:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      description: Obtener todos las transaccionas 
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get payment order txn successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findAll', PaymentOrderTxnComponent.findAll);
/**
 *  @swagger
 *  /payment_order_txn/find_one/{id}:
 *  get:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      description: Obtener un ta transacción
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la transacción
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get payment order txn successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.get('/findOne/:id', PaymentOrderTxnComponent.findOne);
/**
 *  @swagger
 * /payment_order_txn/create:
 *  post:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      description: Crear un nueva transacción
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/TransaccionesOrdenesDePago'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create payment order txn successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.post('/create', PaymentOrderTxnComponent.create);
/**
 *  @swagger
 * /payment_order_txn/update/{id}:
 *  put:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      description: Actualizar una transacción
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la transacción
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
 *                      $ref: '#/components/schemas/TransaccionesOrdenesDePago'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update payment order txn successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/update/:id', PaymentOrderTxnComponent.update);
/**
 *  @swagger
 * /payment_order_txn/remove/{id}:
 *  delete:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      description: Eliminar una transacción
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la transacción a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete type payment order txn successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.delete('/remove/:id', PaymentOrderTxnComponent.remove);
/**
 *  @swagger
 * /payment_order_txn/restore/{id}:
 *  put:
 *      tags:
 *          - Tipo de pagos
 *      description: Restaurar una transacción
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la transacción
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore type payment order txn successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', PaymentOrderTxnComponent.restore);



/**
 *  @swagger
 *  /purchase_order/find_all:
 *  get:
 *      tags:
 *          - Pedidos
 *      description: Obtener todos los pedidos
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get purchase orders successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/






/**
 *  @swagger
 *  /shopping/find_all:
 *  get:
 *      tags:
 *          - Compras a proveedores
 *      description: Obtener todos las compras
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get shopings successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
/**
 *  @swagger
 *  /shopping/find_one/{id}:
 *  get:
 *      tags:
 *          - Compras a proveedores
 *      description: Obtener una compra
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la compra
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get shopping successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
/**
 *  @swagger
 * /shopping/create:
 *  post:
 *      tags:
 *          - Compras a proveedores
 *      description: Crear una compra para surtir el inventario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/TipoDePago'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create payment type successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
/**
 *  @swagger
 * /shopping/update/{id}:
 *  put:
 *      tags:
 *          - Tipo de pagos
 *      description: Actualizar un tipo de pago en el catalogo
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del tipo de pago a actualizar
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
 *                      $ref: '#/components/schemas/ComprasProveedores'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update shopping successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
/**
 *  @swagger
 * /shopping/remove/{id}:
 *  delete:
 *      tags:
 *          - Compras a proveedores
 *      description: Eliminar una compra
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id  de la compra a eliminar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Delete shopping successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
/**
 *  @swagger
 * /shopping/restore/{id}:
 *  put:
 *      tags:
 *          - Compras a proveedores
 *      description: Restaurar una compra
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la compra
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Restore shopping successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/
router.put('/restore/:id', PaymentTypeComponent.restore);






/**
 * @swagger
 *  /log/find_all:
 *  get:
 *      tags:
 *          - Registros de acciones
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
 *      Usuario:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: El nombre del usuario
 *              last_name:
 *                  type: string
 *                  description: El apellido materno del usuario
 *              second_surname:
 *                  type: string
 *                  description: El apellido paterno del usuario
 *              phone_number:
 *                  type: string
 *                  description: El numero del telefono del usuario
 *              email:
 *                  type: string
 *                  description: El correo del usuario
 *              password:
 *                  type: string
 *                  description: La contraseña del usuario
 *          required:
 *              - name
 *              - email
 *              - password
 *          example:
 *              name: 'admin'
 *              last_name: 'escobar'
 *              second_surname: 'martinez'
 *              phone_number: '9661006460'
 *              email: 'admind@gmail.com'
 *              password: '123456'
 *      InicioDeSesion:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: El correo del usuario
 *              password:
 *                  type: string
 *                  description: La contraseña del usuario
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: 'admind@gmail.com'
 *              password: '123456'
 *      Marca:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: El nombre de la marca
 *          required:
 *              - name
 *          example:
 *              name: 'gamesa'
 *      TipoDePago:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: El nombre del tipo de pago
 *          required:
 *              - name
 *          example:
 *              name: 'Tarjeta de crédito'
 *      Producto:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Nombre del producto
 *              description:
 *                  type: text
 *                  description: Descripción del producto
 *              sku:
 *                  type: string
 *                  description: El sku del producto
 *              price:
 *                  type: number
 *                  format: double
 *                  description: El precio del producto
 *              reorder_point:
 *                  type: integer
 *                  description: La cantidad de producto minima para reordenar o resurtir
 *              brand_id:
 *                  type: integer
 *                  description: El id de la marca asociada al producto
 *              supplier_customer_id:
 *                  type: integer
 *                  description: El id del proveedor del producto
 *          required:
 *              - name
 *              - sku
 *              - price
 *              - reorder_point
 *              - brand_id
 *              - supplier_customer_id
 *          example:
 *              name: 'Galletas maría gamesa'
 *              description: 'Producto de tal proveedor, etc'
 *              sku: 'game'
 *              price: 15
 *              reorder_point: 15
 *              brand_id: 1
 *              supplier_customer_id: 1
 *      Proveedor:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: El nombre del proveedor
 *              address:
 *                  type: string
 *                  description: La dirección del proveedor
 *              phone_number:
 *                  type: string
 *                  description: El numero de contacto del proveedor
 *              type_user:
 *                  type: string
 *                  description: El nombre del proveedor
 *                  enum: ["supplier","customer"]
 *          required:
 *              - name
 *          example:
 *              name: 'supplier'
 *              type_user: 'customer|supplier'
 *      Inventario:
 *          type: object
 *          properties:
 *              product_id:
 *                  type: integer
 *                  description: El id del producto
 *              quantity:
 *                  type: integer
 *                  description: La cantidad de productos a agregar al inventario
 *          required:
 *              - product_id
 *              - quantity
 *          example:
 *              product_id: 1
 *              quantity: 20
 *      Venta:
 *          type: object
 *          properties:
 *              product_id:
 *                  type: integer
 *                  description: El id del producto
 *              quantity:
 *                  type: number
 *                  description: La cantidad de productos a vender
 *          required:
 *              - product_id
 *              - quantity
 *          example:
 *              product_id: 1
 *              quantity: 5
 *      Pedidos:
 *          type: object
 *          properties:
 *              shopping_id:
 *                  type: integer
 *                  description: La compra asociada
 *              payment_order_id:
 *                  type: number
 *                  description: La orden de pago asociada a una venta
 *          required:
 *              - shopping_id
 *              - payment_order_id
 *          example:
 *              shopping_id: 1
 *              payment_order_id: 1
 *      ComprasProveedores:
 *          type: object
 *          properties:
 *              inventory_id:
 *                  type: integer
 *                  description: El inventario donde se registran los productos comprados
 *              unit_price:
 *                  type: number
 *                  description: El precio unitario por la cantidad de productos que ingresan al inventario
 *          required:
 *              - inventory_id
 *              - unit_price
 *          example:
 *              inventory_id: 1
 *              unit_price: 25
 *      OrdenesDePago:
 *          type: object
 *          properties:
 *              payment_date:
 *                  type: date
 *                  description: La fecha de la compra, se ingresa ya que puede ser distinta a la actual
 *              status:
 *                  type: number
 *                  description: El estado posible de una orden
 *                  enum: ['pending', 'process','completed','failed','cancelled','refunded','verifying','rejected']
 *          required:
 *              - payment_date
 *              - status
 *          example:
 *              payment_date: '2023-12-27'
 *              status: 'pending'
 *      TransaccionesOrdenesDePago:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *                  description: El estado posible de una orden
 *                  enum: ['pending', 'process','completed','failed','cancelled','refunded','verifying','rejected']
 *              amount:
 *                  type: integer
 *                  description: El monto de la transacción
 *              user_id:
 *                  type: integer
 *                  description: El identificador del usuario que inicio sesión
 *              payment_type_id:
 *                  type: integer
 *                  description: El identificador del tipo de pago
 *              payment_order_id:
 *                  type: integer
 *                  description: El identificador de la orden de pago generada
 *              supplier_customer_id:
 *                  type: integer
 *                  description: El id del proveedor o cliente a quien se le genero la orden de pago
 *          required:
 *              - status
 *              - payment_type_id
 *              - payment_order_id
 *              - supplier_customer_id
 *          example:
 *              status: 'pending'
 *              amount: 1
 *              user_id: 1
 *              payment_type_id: 1
 *              payment_order_id: 1
 *              supplier_customer_id: 1
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