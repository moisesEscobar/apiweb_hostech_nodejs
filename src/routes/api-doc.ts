import { AuthComponent } from '../components';
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
 *              brand_id:
 *                  type: integer
 *                  description: the product brand id
 *          required:
 *              - name
 *              - key
 *              - brand_id
 *          example:
 *              name: 'Galletas maria gamesa'
 *              key: 'game'
 *              brand_id: 1
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