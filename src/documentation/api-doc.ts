


/**
 * @swagger
 * tags:
 *  -   name: Usuarios
 *      description: Detalles de los usuarios
 *  -   name: Catálogos - Crear
 *      description: Todas las peticiones para    Crear elementos de los catálogos (productos,tipos de pagos, proveedores,etc)
 *  -   name: Catálogos - Obtener
 *      description: Todas las peticiones para    Obtener elementos de los catálogos (productos,tipos de pagos, proveedores,etc)
 *  -   name: Catálogos - Actualizar
 *      description: Todas las peticiones para actualizar catálogos (productos,tipos de pagos, proveedores,etc)
 *  -   name: Catálogos - Eliminar
 *      description: Todas las peticiones para eliminar catálogos (productos,tipos de pagos, proveedores,etc)
 *  -   name: Catálogos - Restaurar
 *      description: Todas las peticiones para restaurar catálogos (productos,tipos de pagos, proveedores,etc)
 *  -   name: Ventas
 *      description: Ventas de productos (Las compras de los clientes)
 *  -   name: Reportes
 *      description: Diversos reportes
 *  -   name: Comprar y surtir inventarios
 *      description: Se crea un registro a la tabla de compras, la cual esta vinculada directamente con el inventario
 *  -   name: Ordenes de pago para las compras
 *      description: Diversos reportes
 *  -   name: Transacciones de las ordenes de pago
 *      description: Es el la tabla donde se registran los pagos y la culminación de la compra y las ordenes de pago
 * /auth/login:
 *  post:
 *      tags:
 *          - Usuarios
 *      summary: Registrar un nuevo usuario
 *      description: Se crean nuevos usuarios 
 *      tag: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: El correo del usuario
 *                      password:
 *                          type: string
 *                          description: La contraseña del usuario
 *                  required:
 *                      - email
 *                      - password
 *                  example:
 *                      email: 'admind@gmail.com'
 *                      password: '123456'
 *      responses:
 *          200:
 *              description: (OK) Successfully logged in
 *          404:
 *              description: (ERROR) Bad Request
 *          500:
 *              description: (ERROR) Internal Server Error
 * /auth/signup:
 *  post:
 *      tags:
 *          - Usuarios
 *      summary: Iniciar sesión y obtener un token
 *      description: Inicio sesión de usuarios, se retorno un token de acceso
 *      tag: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: El nombre del usuario
 *                          last_name:
 *                              type: string
 *                              description: El apellido materno del usuario
 *                          second_surname:
 *                              type: string
 *                              description: El apellido paterno del usuario
 *                          phone_number:
 *                              type: string
 *                              description: El numero del telefono del usuario
 *                          email:
 *                              type: string
 *                              description: El correo del usuario
 *                          password:
 *                              type: string
 *                              description: La contraseña del usuario
 *                      required:
 *                          - name
 *                          - email
 *                          - password
 *                      example:
 *                          name: 'admin'
 *                          last_name: 'escobar'
 *                          second_surname: 'martinez'
 *                          phone_number: '9661006460'
 *                          email: 'admind@gmail.com'
 *                          password: '123456'
 *      responses:
 *          200:
 *              description: (OK)  Successfully signup
 *          400:
 *              description: (ERROR) Bad Request
 *          500:
 *              description: (ERROR) Internal Server Error
*/


/**
 * @swagger
 * /brand/create:
 *  post:
 *      tags:
 *          -    Catálogos - Crear
 *      summary: Crear una marca
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
 * /product/create:
 *  post:
 *      tags:
 *          -    Catálogos - Crear
 *      summary: Crear un producto
 *      description: Crear un nuevo producto en el catalogo
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ProductoCreacion'
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
 * /supplier/create:
 *  post:
 *      tags:
 *          -    Catálogos - Crear
 *      summary: Crear un proveedor o cliente
 *      description: Crear un nuevo proveedor
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ProveedorCreacion'
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
 * /inventory/create:
 *  post:
 *      tags:
 *          -    Catálogos - Crear
 *      summary: Crear un inventario
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
 * /payment_type/create:
 *  post:
 *      tags:
 *          -    Catálogos - Crear
 *      summary: Crear un tipo de pago
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





/**
 * @swagger
 *  /brand/find_all:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener todas las marcas
 *      description: Obtener todas las marcas
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get Brands successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /brand/find_all_with_products:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener solo marcas con productos
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
 * /brand/find_one/{id}:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener una marca
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
 * /brand/search/?name={name}:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Búsqueda de marcas
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
 * /product/find_all:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener productos
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
 * /product/find_one/{id}:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener un producto
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
 * /product/search/:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Búsqueda de productos
 *      description: Buscar productos por varios campos y paginación
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
 * /supplier/find_all:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener proveedores
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
 * /supplier/find_one/{id}:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener un proveedor
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
 * /inventory/find_all:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener todos los inventarios
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
 * /inventory/find_one/{id}:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener un inventario
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
 * /payment_type/find_all:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener los tipos de pagos
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
 * /payment_type/find_one/{id}:
 *  get:
 *      tags:
 *          - Catálogos - Obtener
 *      summary: Obtener un tipo de pago
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








/**
 * @swagger
 * /brand/remove/{id}:
 *  delete:
 *      tags:
 *          - Catálogos - Eliminar
 *      summary: Eliminar una marca
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
 * /product/remove/{id}:
 *  delete:
 *      tags:
 *          - Catálogos - Eliminar
 *      summary: Eliminar un producto
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
 * /supplier/remove/{id}:
 *  delete:
 *      tags:
 *          - Catálogos - Eliminar
 *      summary: Eliminar un proveedor
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
 * /inventory/remove/{id}:
 *  delete:
 *      tags:
 *          - Catálogos - Eliminar
 *      summary: Eliminar un inventario
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
 * /payment_type/remove/{id}:
 *  delete:
 *      tags:
 *          - Catálogos - Eliminar
 *      summary: Eliminar un tipo de pago
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








/**
 * @swagger
 * /log/find_all:
 *  get:
 *      tags:
 *          - Reportes
 *      summary: Registro de acciones en la API
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
 * /product/report_resume:
 *  get:
 *      tags:
 *          - Reportes
 *      summary: Productos con sus ventas y disponibilidades
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







/**
 * @swagger
 * /brand/update/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Actualizar
 *      summary: Actualizar una marca
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
 * /product/update/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Actualizar
 *      summary: Actualizar un producto
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
 *                      $ref: '#/components/schemas/ProductoActualizacion'
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
 * /supplier/update/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Actualizar
 *      summary: Actualizar un proveedor o cliente
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
 *                      $ref: '#/components/schemas/ProveedorActualizacion'
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
 * /inventory/update/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Actualizar
 *      summary: Actualizar un inventario
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
 *                      $ref: '#/components/schemas/InventarioActualizacion'
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
 * /payment_type/update/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Actualizar
 *      summary: Actualizar un tipo de pago
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








/**
 *  @swagger 
 * /brand/restore/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Restaurar
 *      summary: Restaurar una marca
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
 * /product/restore/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Restaurar
 *      summary: Restaurar un producto
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
 * /supplier/restore/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Restaurar
 *      summary: Restaurar un proveedor
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
 * /inventory/restore/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Restaurar
 *      summary: Restaurar un inventario
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
 * /payment_type/restore/{id}:
 *  put:
 *      tags:
 *          - Catálogos - Restaurar
 *      summary: Restaurar un tipo de pago
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







/**
 *  @swagger
 * /payment_order_txn/find_all:
 *  get:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      summary: Obtener transacciones
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
 * /payment_order_txn/find_one/{id}:
 *  get:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      summary: Obtener una transacción
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
 * /payment_order_txn/create:
 *  post:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      summary: Crear una transaction
 *      description: Crear un nueva transacción
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/TransaccionesOrdenesDePagoCreacion'
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
 * /payment_order_txn/update/{id}:
 *  put:
 *      tags:
 *          - Transacciones de las ordenes de pago
 *      summary: Actualizar una transacción
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
 *                      $ref: '#/components/schemas/TransaccionesOrdenesDePagoActualizacion'
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


/**
 *  @swagger
 * /shopping_inventory/create:
 *  post:
 *      tags:
 *          - Comprar y surtir inventarios
 *      description: Crear un nueva compra y surtir el inventario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ComprasInventariosProveedores'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create shopping and inventory successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /shopping_inventory/find_all:
 *  get:
 *      tags:
 *          - Comprar y surtir inventarios
 *      summary: Obtener las compras e inventarios de proveedores
 *      description: Obtener las compras
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get shoppings and inventories successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
*/



/**
 *  @swagger
 * /payment_order/create:
 *  post:
 *      tags:
 *          - Ordenes de pago para las compras
 *      description: Crear un orden pago para las ventas
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
 *              description: (OK) Create payment order  successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /payment_order/find_all:
 *  get:
 *      tags:
 *          - Ordenes de pago para las compras
 *      summary: Obtener las ordenes de pago de las compras
 *      description: Obtener las ordenes de pago de las compras a los proveedores
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







/**
 * @swagger
 * /sale/find_all:
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
 * /sale/find_one/{id}:
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








/**
 * @swagger
 * components:
 *  schemas:
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
 *      ProductoCreacion:
 *          type: object
 *          properties:
 *              file:
 *                  type: string
 *                  format: binary
 *                  description: Nombre del productoArchivo a cargarNombre del producto
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
 *      ProductoActualizacion:
 *          type: object
 *          properties:
 *              description:
 *                  type: text
 *                  description: Descripción del producto
 *              price:
 *                  type: number
 *                  format: double
 *                  description: El precio del producto
 *              reorder_point:
 *                  type: integer
 *                  description: La cantidad de producto minima para reordenar o resurtir
 *          required:
 *              - price
 *              - reorder_point
 *          example:
 *              description: 'Producto de tal proveedor, etc'
 *              price: 15
 *              reorder_point: 15
 *      ProveedorCreacion:
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
 *              address: 'Avenida popocatepetl'
 *              phone_number: '9661006460'
 *              type_user: 'customer|supplier'
 *      ProveedorActualizacion:
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
 *          required:
 *              - name
 *          example:
 *              name: 'supplier'
 *              address: 'Avenida popocatepetl'
 *              phone_number: '9661006460'
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
 *      InventarioActualizacion:
 *          type: object
 *          properties:
 *              quantity:
 *                  type: integer
 *                  description: La cantidad de productos a agregar al inventario
 *          required:
 *              - quantity
 *          example:
 *              quantity: 20
 *      ComprasInventariosProveedores:
 *          type: object
 *          properties:
 *              product_id:
 *                  type: integer
 *                  description: El id del producto
 *              quantity:
 *                  type: integer
 *                  description: La cantidad de productos a comprar
 *              unit_price:
 *                  type: number
 *                  description: El precio unitario del producto
 *          required:
 *              - product_id
 *              - quantity
 *              - unit_price
 *          example:
 *              product_id: 1
 *              quantity: 25
 *              unit_price: 15
 *      OrdenesDePago:
 *          type: object
 *          properties:
 *              shopping_id:
 *                  type: integer
 *                  description: El id de la compra asociada a las orden de pago
 *              payment_date:
 *                  type: date
 *                  description: La fecha de la compra, se ingresa ya que puede ser distinta a la actual
 *              status:
 *                  type: number
 *                  description: El estado posible de una orden
 *                  enum: ['pending', 'process','completed','failed','cancelled','refunded','verifying','rejected']
 *          required:
 *              - shopping_id
 *              - payment_date
 *              - status
 *          example:
 *              shopping_id: 1
 *              payment_date: '2023-12-27'
 *              status: 'pending'
 *      TransaccionesOrdenesDePagoCreacion:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
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
 *      TransaccionesOrdenesDePagoActualizacion:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
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
 *          required:
 *              - status
 *          example:
 *              status: 'pending'
 *              amount: 1
 *              user_id: 1
 *              payment_type_id: 1
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
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          name: x-access-token
 *          in: header
*/