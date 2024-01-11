/**
 * @swagger
 * tags:
 *  -   name: Usuarios
 *      description: Detalles de los usuarios
 *  -   name: Proveedores
 *      description: Detalles del los proveedores
 *  -   name: Cuentas
 *      description: Detalles de las cuentas
 *  -   name: Marcas
 *      description: Detalles del catalogo de marcas
 *  -   name: Productos
 *      description: Detalles del catalogo de productos
 *  -   name: Tipo de pagos
 *      description: Detalles del catalogo de tipo de pagos
 *  -   name: Compras a proveedores y surtir inventario
 *      description: Las compras de recursos a proveedores
 *  -   name: Inventarios
 *      description: Detalles del inventario de productos
 *  -   name: Ordenes de pago
 *      description:    Las ordenes de pago generadas para los proveedores, estas pueden tener una o mas compras
 *  -   name: Transacciones de las ordenes de pago
 *      description: Es el la tabla donde se registran los pagos y la culminación de la compra y las ordenes de pago
 *  -   name: Registros de acciones
 *      description: Listado de acciones del sistema
 *  -   name: Ventas
 *      description: Detalles de las ventas de los productos (Los productos que el cliente compra)
 *  -   name: Ordenes de cobro a clientes
 *      description: Detalles de las ordenes de cobro vinculadas a clientes
 *  -   name: Entradas
 *      description: Creación de entradas de dinero a las cuentas bancarias
 *  -   name: Salidas
 *      description: Creación de salidas de dinero a las cuentas bancarias
 *  -   name: Reportes
 *      description: Reportes
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
 *                              description: El numero del teléfono del usuario
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
 *  @swagger
 * /supplier/create:
 *  post:
 *      tags:
 *          - Proveedores
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
 * /supplier/find_all:
 *  get:
 *      tags:
 *          - Proveedores
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
 * /supplier/search/:
 *  get:
 *      tags:
 *          - Proveedores
 *      summary: Búsqueda de proveedores
 *      description: Buscar proveedores por varios campos y paginación
 *      parameters:
 *          - name: type_user
 *            in: query
 *            description: Tipo de usuario
 *            schema:
 *              type: string
 *              enum: ["supplier","customer"]
 *              example: 'supplier'
 *          - name: name
 *            in: query
 *            description: Nombre del proveedor
 *            example: 'supplier'
 *            schema:
 *              type: string
 *          - name: address
 *            in: query
 *            description: Dirección
 *            example: ''
 *            schema:
 *              type: string
 *          - name: phone_number
 *            in: query
 *            description: Numero telefónico
 *            example: '9661006460'
 *            schema:
 *              type: string
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: '2023-12-19'
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: '2024-01-20'
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
 *            example: 100
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
 * /supplier/find_one/{id}:
 *  get:
 *      tags:
 *          - Proveedores
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
 * /supplier/update/{id}:
 *  put:
 *      tags:
 *          - Proveedores
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
 * /supplier/remove/{id}:
 *  delete:
 *      tags:
 *          - Proveedores
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
 * /supplier/restore/{id}:
 *  put:
 *      tags:
 *          - Proveedores
 *      summary: Restaurar un proveedor
 *      description: Restaurar un proveedor
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del proveedor
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
 * /brand/create:
 *  post:
 *      tags:
 *          - Marcas
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
 * /brand/find_all:
 *  get:
 *      tags:
 *          - Marcas
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
 * /brand/find_one/{id}:
 *  get:
 *      tags:
 *          - Marcas
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
 * /brand/find_all_with_products:
 *  get:
 *      tags:
 *          - Marcas
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
 * /brand/search/:
 *  get:
 *      tags:
 *          - Marcas
 *      summary: Búsqueda de marcas
 *      description: Buscar marcas por nombre
 *      parameters:
 *          - name: name
 *            in: query
 *            description: Nombre de la marca
 *            example: 'marca'
 *            schema:
 *              type: string
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: '2023-12-19'
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: '2024-01-20'
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
 *            example: 100
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
 * /brand/remove/{id}:
 *  delete:
 *      tags:
 *          - Marcas
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
 * /brand/update/{id}:
 *  put:
 *      tags:
 *          - Marcas
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
 * /brand/restore/{id}:
 *  put:
 *      tags:
 *          - Marcas
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
 * /product/create:
 *  post:
 *      tags:
 *          - Productos
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
 * /product/find_all:
 *  get:
 *      tags:
 *          - Productos
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
 *          - Productos
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
 *          - Productos
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
 *            example: 'producto'
 *            schema:
 *              type: string
 *          - name: brand_id
 *            in: query
 *            description: Id de la marca
 *            example: 1
 *            schema:
 *              type: integer
 *          - name: supplier_customer_id
 *            in: query
 *            description: Id del proveedor
 *            example: 1
 *            schema:
 *              type: integer
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: '2023-12-19'
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: '2024-01-20'
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
 *            example: 100
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
 * /product/remove/{id}:
 *  delete:
 *      tags:
 *          - Productos
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
 * /product/report_resume:
 *  get:
 *      tags:
 *          - Productos
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
 * /product/update/{id}:
 *  put:
 *      tags:
 *          - Productos
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
 * /product/restore/{id}:
 *  put:
 *      tags:
 *          - Productos
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
 * /payment_type/create:
 *  post:
 *      tags:
 *          - Tipo de pagos
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
 * /payment_type/search:
 *  get:
 *      tags:
 *          - Tipo de pagos
 *      summary: Obtener los tipos de pagos
 *      description: Obtener todos los tipos de pagos
 *      parameters:
 *          - name: name
 *            in: query
 *            description: Nombre de tipo de pago
 *            example: 'supplier'
 *            schema:
 *              type: string
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: '2023-12-19'
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: '2024-01-20'
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
 *            example: 100
 *            schema:
 *              type: integer
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
 *          - Tipo de pagos
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
 * /payment_type/update/{id}:
 *  put:
 *      tags:
 *          - Tipo de pagos
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
 * /payment_type/remove/{id}:
 *  delete:
 *      tags:
 *          - Tipo de pagos
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
 * /payment_type/restore/{id}:
 *  put:
 *      tags:
 *          - Tipo de pagos
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
 * 
 * 
 * /account/search:
 *  get:
 *      tags:
 *          - Cuentas
 *      summary: Obtener las cuentas
 *      description: Obtener y buscar todos las cuentas
 *      parameters:
 *          - name: account_name
 *            in: query
 *            description: Nombre de la cuenta
 *            example: 
 *            schema:
 *              type: string
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["initial_balance"]
 *              example: 
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 
 *            schema:
 *              type: number
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: 
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: 
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
 *            example: 100
 *            schema:
 *              type: integer
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get accounts successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /account/find_one/{id}:
 *  get:
 *      tags:
 *          - Cuentas
 *      summary: Obtener una Cuentas
 *      description: Obtener una Cuenta
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la cuenta
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get accounts txn successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /account/create:
 *  post:
 *      tags:
 *          - Cuentas
 *      summary: Crear una cuenta
 *      description: Crear un nueva cuenta
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Cuenta'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create account successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /account/update/{id}:
 *  put:
 *      tags:
 *          - Cuentas
 *      summary: Actualizar una cuenta
 *      description: Actualizar una cuenta
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la cuenta
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
 *                      $ref: '#/components/schemas/CuentaActualizacion'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Update account successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * 
 * 

 * 
 * 
 * /inventory/search:
 *  get:
 *      tags:
 *          - Inventarios
 *      summary: Inventario de productos
 *      description: Detalles de cada producto y su inventario
 *      parameters:
 *          - name: product_id
 *            in: query
 *            description: Id del producto
 *            example: 
 *            schema:
 *              type: integer
 *          - name: supplier_customer_id
 *            in: query
 *            description: Id del proveedor
 *            example: 
 *            schema:
 *              type: integer
 *          - name: brand_id
 *            in: query
 *            description: Id de la marca
 *            example: 
 *            schema:
 *              type: integer
 *          - name: product_sku
 *            in: query
 *            description: El código del producto
 *            example: 
 *            schema:
 *              type: string
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["product_price","product_reorder_point","quantity_sold","total_quantity","quantity_available","total_amount_sold"]
 *              example: 'product_price'
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 1
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 100
 *            schema:
 *              type: number
 *          - name: page
 *            in: query
 *            description: Numero de la pagina
 *            example: 1
 *            schema:
 *              type: integer
 *          - name: page_size
 *            in: query
 *            description: Registros por pagina
 *            example: 100
 *            schema:
 *              type: integer
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
 * /supplier/summary_shopings:
 *  get:
 *      tags:
 *          - Inventarios
 *      summary: Obtener proveedores y resumen de compras
 *      description: Obtener todos los proveedores con su resumen de compras
 *      parameters:
 *          - name: type_user
 *            in: query
 *            required: true
 *            description: Proveedores igual a COMPRAS y cliente igual a VENTAS
 *            schema:
 *              type: string
 *              enum: ["supplier","customer"]
 *              example: 'supplier'
 *          - name: name
 *            in: query
 *            description: Nombre del proveedor
 *            example: 
 *            schema:
 *              type: string
 *          - name: address
 *            in: query
 *            description: Dirección
 *            example: 
 *            schema:
 *              type: string
 *          - name: phone_number
 *            in: query
 *            description: Numero telefónico
 *            example: 
 *            schema:
 *              type: string
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["total_products","total_amount_purchase","total_amount_paid","amount_payable"]
 *              example: 
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 
 *            schema:
 *              type: number
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: 
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: 
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
 *            example: 100
 *            schema:
 *              type: integer
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
 * /inventory/find_one/{id}:
 *  get:
 *      tags:
 *          - Inventarios
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
 * /sale/search:
 *  get:
 *      tags:
 *          - Ventas
 *      description: Obtener todas las ventas
 *      parameters:
 *          - name: supplier_customer_id
 *            in: query
 *            description: Id del Cliente por el cual buscar
 *            example: 
 *            schema:
 *              type: number
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["quantity_products","amount_payable","total_amount"]
 *              example: 
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 
 *            schema:
 *              type: number
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at","date_sale"]
 *              example: 
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: 
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: 
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
 *            example: 100
 *            schema:
 *              type: integer
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
 * /shopping_inventory/create:
 *  post:
 *      tags:
 *          - Compras a proveedores y surtir inventario
 *      summary: Comprar a proveedores y surtir inventarios
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
 *          - Compras a proveedores y surtir inventario
 *      summary: Obtener las compras e inventarios de proveedores
 *      description: Obtener las compras
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get shoppings  successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /shopping_inventory/find_one/{id}:
 *  get:
 *      tags:
 *          - Compras a proveedores y surtir inventario
 *      summary: Obtener una compra
 *      description: Obtener una sola compra
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
 * /shopping_inventory/search:
 *  get:
 *      tags:
 *          - Compras a proveedores y surtir inventario
 *      summary: Obtener las compras 
 *      description: Obtener resumen de compras
 *      parameters:
 *          - name: supplier_customer_id
 *            in: query
 *            description: Id del proveedor
 *            example: 
 *            schema:
 *              type: integer
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["quantity_products","total_amount_purchase","amount_payable"]
 *              example: 'quantity_products'
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 1
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 100
 *            schema:
 *              type: number
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at","date_purchase"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: '2023-12-19'
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: '2024-01-20'
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
 *            example: 100
 *            schema:
 *              type: integer
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get shoppings successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /log/find_all:
 *  get:
 *      tags:
 *          - Registros de acciones
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
 * /log/find_one/{id}:
 *  get:
 *      tags:
 *          - Registros de acciones
 *      summary: Obtener un registro de acciones
 *      description: Obtener una solo registro de acciones
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del registro de acciones a buscar
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get Log successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /log/search/:
 *  get:
 *      tags:
 *          - Registros de acciones
 *      summary: Búsqueda de registros de acciones
 *      description: Buscar registros de acciones por varios campos y paginación
 *      parameters:
 *          - name: action
 *            in: query
 *            description: Nombre de la acción registrada
 *            example: 'create'
 *            schema:
 *              type: string
 *              enum: ["findAll","findOne","search","create","update","remove","restore","reportResume"]
 *              example: ''
 *          - name: catalog
 *            in: query
 *            description: Nombre del catalogo o modulo afectado
 *            example: 'brand'
 *            schema:
 *              type: string
 *              enum: ["account","brand","expense","income","inventory","order_receive","payment_order_purchase","payment_order_txn","payment_type","product","sale","shopping_inventory","supplier"]
 *              example: ''
 *          - name: user_id
 *            in: query
 *            description: Id del usuario que registro la acción
 *            example: 1
 *            schema:
 *              type: integer
 *          - name: user_name
 *            in: query
 *            description: Nombre del usuario que registro la acción
 *            example: ''
 *            schema:
 *              type: string
 *          - name: user_email
 *            in: query
 *            description: Correo del usuario que registro la acción
 *            example: ''
 *            schema:
 *              type: string
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: '2023-12-19'
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: '2024-01-20'
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
 *            example: 100
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Searchs logs successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /payment_order/create:
 *  post:
 *      tags:
 *          - Ordenes de pago
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
 * /payment_order/search:
 *  get:
 *      tags:
 *          - Ordenes de pago
 *      description: Obtener todas las ordenes de pago
 *      parameters:
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["total_amount"]
 *              example: 
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 
 *            schema:
 *              type: number
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at","payment_date"]
 *              example: 
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: 
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: 
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
 *            example: 100
 *            schema:
 *              type: integer
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
 * /payment_order/find_one/{id}:
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
 * /order_receive/create:
 *  post:
 *      tags:
 *          - Ordenes de cobro a clientes
 *      description: Crear ordenes de cobro a varias ventas
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/OrdenesCobro'
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Create order receive successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /order_receive/search/:
 *  get:
 *      tags:
 *          - Ordenes de cobro a clientes
 *      summary: Búsqueda de ordenes de cobro
 *      description: Buscar ordenes de cobro
 *      parameters:
 *          - name: supplier_customer_id
 *            in: query
 *            description: Id del cliente
 *            example: 1
 *            schema:
 *              type: integer
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["total_amount"]
 *              example: 'total_amount'
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 1
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 100
 *            schema:
 *              type: number
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at"]
 *              example: 'created_at'
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: '2023-12-19'
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: '2024-01-20'
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
 *            example: 100
 *            schema:
 *              type: integer
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Searchs orders receive successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /order_receive/find_one/{id}:
 *  get:
 *      tags:
 *          - Ordenes de cobro a clientes
 *      description: Obtener una orden de cobro
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la orden de cobro
 *            required: true
 *            example: 1
 *            schema:
 *              type: integer
 *              format: int64
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get order receive successfull
 *          404:
 *              description: (ERROR) Bad Request
 *          401:
 *              description: (ERROR) Unauthorized
 *          500:
 *              description: (ERROR) Internal Server Error
 * /income/create:
 *  post:
 *      tags:
 *          - Entradas
 *      description: Crear una entrada manualmente
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Entrada'
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
 * /expense/create:
 *  post:
 *      tags:
 *          - Salidas
 *      description: Crear una salida manualmente
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Salida'
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
 * /income/search:
 *  get:
 *      tags:
 *          - Reportes
 *      summary: Reportes de entradas y salidas
 *      description:  Obtener los reportes de las entradas y salidas
 *      parameters:
 *          - name: account_name
 *            in: query
 *            description: Nombre de la cuenta
 *            example: 
 *            schema:
 *              type: string
 *          - name: supplier_name
 *            in: query
 *            description: Nombre del proveedor o cliente
 *            example: 
 *            schema:
 *              type: string
 *          - name: type_user
 *            in: query
 *            description: Cliente o proveedor
 *            schema:
 *              type: string
 *              enum: ["supplier","customer"]
 *              example: 
 *          - name: type
 *            in: query
 *            description: Entradas o salidas
 *            schema:
 *              type: string
 *              enum: ["income","expense"]
 *              example: 
 *          - name: order_id
 *            in: query
 *            description: El id de la orden de pago o cobro
 *            schema:
 *              type: number
 *              example: 
 *          - name: account_id
 *            in: query
 *            description: El id de la cuenta
 *            schema:
 *              type: number
 *              example: 
 *          - name: supplier_customer_id
 *            in: query
 *            description: El id del proveedor o cliente
 *            schema:
 *              type: number
 *              example: 
 *          - name: field_type
 *            in: query
 *            description: Opciones de campos por los que filtrar un rango de valores
 *            schema:
 *              type: string
 *              enum: ["amount"]
 *              example: 
 *          - name: initial_value
 *            in: query
 *            description: Valor inicial
 *            example: 
 *            schema:
 *              type: number
 *          - name: end_value
 *            in: query
 *            description: Valor final
 *            example: 
 *            schema:
 *              type: number
 *          - name: type_date
 *            in: query
 *            description: Tipo de fecha
 *            schema:
 *              type: string
 *              enum: ["created_at","updated_at","date_order"]
 *              example: 
 *          - name: init_date
 *            in: query
 *            description: Fecha inicial
 *            example: 
 *            schema:
 *              type: string
 *          - name: end_date
 *            in: query
 *            description: Fecha final
 *            example: 
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
 *            example: 100
 *            schema:
 *              type: integer
 *      security:
 *      - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: (OK) Get accounts successfull
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
 *                  description: Carga de imagen (solo formatos jpg, png)
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
 *          example:
 *              name: 'Galletas maría gamesa'
 *              description: 'Producto de tal proveedor, etc'
 *              sku: 'game'
 *              price: 15
 *              reorder_point: 15
 *              brand_id: 1
 *              supplier_customer_id: 1
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
 *              date_purchase:
 *                  type: string
 *                  description: La fecha de compra
 *                  example: '2024-01-01'
 *              products:
 *                  type: array
 *                  description: Los productos a comprar, pueden ser solo 1
 *                  items:
 *                      type: object
 *                      properties:
 *                          product_id:
 *                              type: integer
 *                              required: true
 *                              example: 1
 *                          quantity:
 *                              type: integer
 *                              required: true
 *                              example: 2
 *          required:
 *              - products
 *      OrdenesDePago:
 *          type: object
 *          properties:
 *              account_id:
 *                  type: number
 *                  description: El id de la cuenta
 *                  example: 1
 *              payment_date:
 *                  type: string
 *                  description: La fecha de la compra, se ingresa ya que puede ser distinta a la actual
 *                  example: '2024-01-01'
 *              status:
 *                  type: number
 *                  description: El estado posible de una orden
 *                  enum: ['pending', 'process','completed','failed','cancelled','refunded','verifying','rejected']
 *                  example: 'pending'
 *              shoppings:
 *                  type: array
 *                  description: Los productos a comprar, pueden ser solo 1
 *                  items:
 *                      type: object
 *                      properties:
 *                          shopping_id:
 *                              type: integer
 *                              required: true
 *                              example: 1
 *                          amount:
 *                              type: number
 *                              format: double
 *                              required: true
 *                              example: 100
 *          required:
 *              - shoppings
 *      OrdenesCobro:
 *          type: object
 *          properties:
 *              customer_id:
 *                  type: number
 *                  description: El id del cliente que compra
 *                  example: 3
 *              account_id:
 *                  type: number
 *                  description: El id de la cuenta
 *                  example: 1
 *              date_order:
 *                  type: string
 *                  description: La fecha de la compra, se ingresa ya que puede ser distinta a la actual
 *                  example: '2024-01-01'
 *              sales:
 *                  type: array
 *                  description: Los productos que el cliente compra, pueden ser solo 1
 *                  items:
 *                      type: object
 *                      properties:
 *                          product_sale_id:
 *                              type: integer
 *                              required: true
 *                              example: 1
 *                          amount:
 *                              type: number
 *                              format: double
 *                              required: true
 *                              example: 100
 *          required:
 *              - shoppings
 *              - account_id
 *      TransaccionesOrdenesDePagoCreacion:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  description: El estado posible de una orden
 *                  enum: ['pending', 'process','completed','failed','cancelled','refunded','verifying','rejected']
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
 *              user_id: 1
 *              payment_type_id: 1
 *              payment_order_id: 1
 *              supplier_customer_id: 1
 *      Cuenta:
 *          type: object
 *          properties:
 *              account_name:
 *                  type: string
 *                  description: El nombre de la cuenta
 *              initial_balance:
 *                  type: number
 *                  format: double
 *                  description: Eal saldo inicial de la cuenta
 *          required:
 *              - account_name
 *          example:
 *              account_name: 'Cuenta de moisés'
 *              initial_balance: 100
 *      CuentaActualizacion:
 *          type: object
 *          properties:
 *              account_name:
 *                  type: string
 *                  description: El nombre de la cuenta
 *              initial_balance:
 *                  type: number
 *                  format: double
 *                  description: Eal saldo inicial de la cuenta
 *          example:
 *              account_name: 'Cuenta de moisés'
 *              initial_balance: 100
 *      Entrada:
 *          type: object
 *          properties:
 *              account_id:
 *                  type: number
 *                  description: El id de la cuenta
 *              order_receive_id:
 *                  type: number
 *                  description: El id de la orden de cobro
 *              amount:
 *                  type: number
 *                  format: double
 *                  description: El monto a descontar
 *          required:
 *              - account_id
 *          example:
 *              account_id: 1
 *              order_receive_id: 1
 *              amount: 100
 *      Salida:
 *          type: object
 *          properties:
 *              account_id:
 *                  type: number
 *                  description: El id de la cuenta
 *              payment_order_id:
 *                  type: number
 *                  description: El id de la orden de pago
 *              amount:
 *                  type: number
 *                  format: double
 *                  description: El monto a descontar
 *          required:
 *              - account_id
 *          example:
 *              account_id: 1
 *              payment_order_id: 1
 *              amount: 100
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
 *              date_sale:
 *                  type: string
 *                  description: La fecha de la venta
 *                  example: '2024-01-01'
 *              customer_id:
 *                  type: integer
 *                  description: El id del cliente registrado
 *                  example: 3
 *              products:
 *                  type: array
 *                  description: Los productos a comprar, pueden ser solo 1
 *                  items:
 *                      type: object
 *                      properties:
 *                          product_id:
 *                              type: integer
 *                              required: true
 *                              example: 1
 *                          quantity:
 *                              type: integer
 *                              required: true
 *                              example: 2
 *          required:
 *              - customer_id
 *              - products
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          name: x-access-token
 *          in: header
*/