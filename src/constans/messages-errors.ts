/*
    200
        subcode:
            200: Todo correcto
    200
        sub_code:
            1: Errores de Autenticación y Acceso
            2: Errores de Duplicidad y Asociación
            3: Errores de Formato y Validación (Validaciones joi)
            4: Errores de Existencia y Disponibilidad
*/
const error_messages = {
    email_exist: {
        code: 2,
        messages: {
            en: "This e-mail has already been registered.",
            es: "Este correo electrónico ya ha sido registrado."
        }
    },
    email_not_exist: {
        code: 1,
        messages: {
            en: "Error login, Email not found",
            es: "Error al iniciar sesión, Correo no encontrado."
        }
    },
    incorrect_password: {
        code: 1,
        messages: {
            en: "Incorrect password",
            es: "Contraseña incorrecta."
        }
    },
    format_not_allowed: {
        code: 3,
        messages: {
            en: "File format not allowed",
            es: "Formato de archivo no permitido."
        }
    },
    brand_not_exist: {
        code: 4,
        messages: {
            en: "Brand not found",
            es: "Marca no encontrada."
        }
    },
    brand_exist: {
        code: 2,
        messages: {
            en: "Brand name exist",
            es: "El nombre de la marca ya existe."
        }
    },
    brand_associated: {
        code: 2,
        messages: {
            en: "The brand cannot be updated because it has associated products",
            es: "La marca no puede actualizarse porque tiene productos asociados."
        }
    },
    inventory_not_exist: {
        code: 4,
        messages: {
            en: "Inventory not found",
            es: "Inventario no encontrado."
        }
    },
    log_not_exist: {
        code: 4,
        messages: {
            en: "Log not found",
            es: "Registro no encontrado."
        }
    },
    orderreceive_not_exist: {
        code: 4,
        messages: {
            en: "Order receive not found",
            es: "Pedido recibido no encontrado."
        }
    },
    paymentorder_not_exist: {
        code: 4,
        messages: {
            en: "Payment order not found",
            es: "Orden de pago no encontrada."
        }
    },
    paymentorder_associated: {
        code: 2,
        messages: {
            en: "The shopping cannot be eliminated because it has associated purchase orders",
            es: "La compra no puede eliminarse porque tiene órdenes de compra asociadas."
        }
    },
    paymentordertxn_not_exist: {
        code: 4,
        messages: {
            en: "Payment order txn not found",
            es: "Transacción de orden de pago no encontrada."
        }
    },
    paymenttype_not_exist: {
        code: 4,
        messages: {
            en: "Payment Type not found",
            es: "Tipo de pago no encontrado."
        }
    },
    paymenttype_exist: {
        code: 2,
        messages: {
            en: "Payment Type name exist",
            es: "El nombre del tipo de pago ya existe."
        }
    },
    paymenttype_associated: {
        code: 2,
        messages: {
            en: "The payment type cannot be updated because it has associated transactions",
            es: "El tipo de pago no puede actualizarse porque tiene transacciones asociadas."
        }
    },
    product_not_exist: {
        code: 4,
        messages: {
            en: "Product not found",
            es: "Producto no encontrado."
        }
    },
    productsku_exist: {
        code: 2,
        messages: {
            en: "Product sku exist",
            es: "SKU del producto ya existe."
        }
    },
    supplier_not_exist: {
        code: 4,
        messages: {
            en: "Supplier not found",
            es: "Proveedor no encontrado."
        }
    },
    suppliername_exist: {
        code: 2,
        messages: {
            en: "Supplier name exist",
            es: "El nombre del proveedor ya existe."
        }
    },
    shopping_not_exist: {
        code: 4,
        messages: {
            en: "Shopping not found",
            es: "Compra no encontrada."
        }
    },
    sale_not_exist: {
        code: 4,
        messages: {
            en: "Sale not found",
            es: "Venta no encontrada."
        }
    },
    sale_associated: {
        code: 2,
        messages: {
            en: "The supplier cannot be updated because it has associated inventory",
            es: "El proveedor no puede actualizarse porque tiene inventario asociado."
        }
    },
    supplier_data_associated: {
        code: 2,
        messages: {
            en: "This user cannot be upgraded to this new user type because they have associated sales or purchases.",
            es: "Este usuario no puede actualizarse a este nuevo tipo de usuario porque tiene ventas o compras asociadas."
        }
    },
    date_start_less: {
        code: 3,
        messages: {
            en: "Start date must be less than end date",
            es: "La fecha de inicio debe ser menor que la fecha de fin."
        }
    },
    date_required_type: {
        code: 3,
        messages: {
            en: "A date type must be specified",
            es: "Se debe especificar un tipo de fecha."
        }
    },
    date_required: {
        code: 3,
        messages: {
            en: "A start or end date must be specified",
            es: "Se debe especificar una fecha de inicio o fin."
        }
    },

    date_less_currentdate: {
        code: 3,
        messages: {
            en: "Date must be less than or equal to the current date",
            es: "La fecha debe ser menor o igual a la fecha actual."
        }
    },
    date_start_less_currentdate: {
        code: 3,
        messages: {
            en: "The start date must be less than or equal to the current date",
            es: "La fecha de inicio debe ser menor o igual a la fecha actual."
        }
    },

    value_start_less: {
        code: 3,
        messages: {
            en: "The start value must be less than the end value",
            es: "El valor inicial debe ser menor que el valor final."
        }
    },
    value_required_type: {
        code: 3,
        messages: {
            en: "A field type must be specified",
            es: "Se debe especificar un tipo de campo."
        }
    },
    value_required: {
        code: 3,
        messages: {
            en: "A start or end value must be specified",
            es: "Se debe especificar un valor inicial o final."
        }
    },


    account_not_exist: {
        code: 4,
        messages: {
            en: "Account not found",
            es: "Cuenta no encontrada."
        }
    },
    account_exist: {
        code: 2,
        messages: {
            en: "Account name exist",
            es: "El nombre  la cuenta ya existe."
        }
    },
    account_balance: {
        code: 2,
        messages: {
            en: "The value of the amount is less than the value of the current balance sheet.",
            es: "El valor del monto es menor al valor del balance actual."
        }
    },


};


const error_messages_joi = {
    es:{
        'string.base': '{{#label}} debe ser una cadena de texto',
        'string.empty': '{{#label}} no debe estar vacío',
        'string.min': '{{#label}} debe tener al menos {#limit} caracteres',
        'string.max': '{{#label}} debe tener como máximo {#limit} caracteres',
        'number.base': '{{#label}} debe ser un número',
        'number.min': '{{#label}} debe ser mayor o igual a {#limit}',
        'number.max': '{{#label}} debe ser menor o igual a {#limit}',
        'date.base': '{{#label}} debe ser una fecha válida',
        'any.required': '{{#label}} es requerido',
        'string.email': '{{#label}} debe ser un correo electrónico válido',
        'number.integer': '{{#label}} debe ser un número entero',
        'number.positive': '{{#label}} debe ser un número positivo',
        'string.optional': '{{#label}} es opcional',
        'array.min': '{{#label}} debe contener al menos {#limit} elementos',
        'object.base': '{{#label}} debe ser un objeto',
        'string.valid': '{{#label}} debe ser uno de {#valids}',
        'string.allow': '{{#label}} es permitido dejarlo en blanco',
        'number.optional': '{{#label}} es opcional',
        'array.base': '{{#label}} debe ser un arreglo',
        'string.length': '{{#label}} debe tener exactamente {#limit} caracteres',
        // Validaciones Específicas
        'string.uri': '{{#label}} debe ser un URI válido',
        'string.token': '{{#label}} debe ser un token válido',
        'string.guid': '{{#label}} debe ser un GUID válido',
        'string.hex': '{{#label}} debe contener solo caracteres hexadecimales',
        'string.hostname': '{{#label}} debe ser un hostname válido',
        'string.creditCard': '{{#label}} debe ser una tarjeta de crédito válida',
        'string.isoDate': '{{#label}} debe ser una fecha ISO 8601 válida',
        'string.lowercase': '{{#label}} solo debe contener caracteres en minúscula',
        'string.uppercase': '{{#label}} solo debe contener caracteres en mayúscula',
        'string.trim': '{{#label}} no debe tener espacios al inicio o al final',
        'number.precision': '{{#label}} no debe tener más de {#limit} decimales',
        'number.multiple': '{{#label}} debe ser múltiplo de {#multiple}',
        'array.includes': '{{#label}} debe incluir un valor válido',
        'array.includesOne': '{{#label}} debe incluir al menos uno de los valores válidos',
        'array.sparse': '{{#label}} no debe ser un arreglo disperso',
        'array.excludes': '{{#label}} contiene un valor no permitido',
        'object.and': '{{#label}} debe contener {#presentWithLabels}',
        'object.nand': '{{#label}} no debe existir simultáneamente con {#peersWithLabels}',
        'object.or': '{{#label}} debe contener al menos uno de {#peersWithLabels}',
        'object.xor': '{{#label}} debe contener exactamente uno de {#peersWithLabels}',
        'object.with': 'falta el par requerido "{#peerWithLabel}"',
        'object.without': 'conflicto con el par prohibido "{#peerWithLabel}"',
        'object.missing': '{{#label}} debe contener al menos uno de {#peersWithLabels}',
    }
};

export  {error_messages,error_messages_joi};