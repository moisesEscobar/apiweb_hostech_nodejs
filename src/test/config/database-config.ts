import sequelize from "../../config/connection/connection";

export  async function resetDatabaseForTests(): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    try {
      await sequelize.query('TRUNCATE brands,inventories,logs,payment_order_txns,payment_orders,payment_types,product_Sales,products,purchase_orders,shoppings,suppliers_customers,users RESTART IDENTITY;');
      console.log('PRUEBAS: Base reiniciada');
    } catch (error) {
      console.log('PRUEBAS: Error al reiniciar la base:', error);
    }
  }
}
export  async function seedDatabase(): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    try {
      await sequelize.query("INSERT INTO suppliers_customers(name,phone_number,address,type_user,created_at,updated_at) VALUES('Proveedor1','9661006460','Avenida popocatepetl','supplier',NOW(), NOW()),('Proveedor2','9661006460','Avenida popocatepetl','supplier',NOW(), NOW());");
      await sequelize.query("INSERT INTO users(name,last_name,second_surname,phone_number,email,password,created_at,updated_at) VALUES('admin','escobar','martinez','9661006460','admind@gmail.com','$2b$10$cAmS1Hk9.k.K0ULwX9BGO.PT.QbscjbsdMTim3w2/OEQoinfmpSyW',NOW(), NOW()),('admin1','escobar','martinez','9661006460','admind1@gmail.com','$2b$10$ja/J7bZLx.qzgaSQV5yKFuzoBir07B78dYCwEXFI71UvWBcQHaWCu',NOW(), NOW());");
      await sequelize.query("INSERT INTO brands(name,created_at,updated_at) VALUES('Marca1',NOW(), NOW()), ('Marca2',NOW(), NOW()), ('Marca3',NOW(), NOW()), ('Marca4',NOW(), NOW()), ('Marca5',NOW(), NOW()), ('Marca6',NOW(), NOW()), ('Gamesa',NOW(), NOW());");
      await sequelize.query("INSERT INTO payment_types(name,created_at,updated_at) VALUES('Tarjeta Crédito',NOW(), NOW()),('Tarjeta Débito',NOW(), NOW()),('Tarjeta Débito1',NOW(), NOW()),('Tarjeta Débito2',NOW(), NOW());");
      await sequelize.query("INSERT INTO products(name,sku,price,reorder_point,brand_id,supplier_customer_id,created_at,updated_at,description) VALUES('Producto1','P1',10,10,1,1,NOW(), NOW(),null),('Producto2','P2',20,25,2,2,NOW(), NOW(),null), ('Producto3','P3',20,25,1,2,NOW(), NOW(),null) , ('Producto4','P4',20,25,2,2,NOW(), NOW(),null),('Galletas Marías Gamesa','GMG',15,15,6,3,NOW(), NOW(),null);");
      await sequelize.query("INSERT INTO inventories(product_id,quantity,created_at,updated_at) VALUES(1,30,NOW(), NOW()),(2,40,NOW(), NOW()),(3,30,NOW(), NOW());");
      await sequelize.query("INSERT INTO product_sales(product_id,quantity,total_amount,created_at,updated_at) VALUES(1,2,20,NOW(), NOW()),(2,3,60,NOW(), NOW()),(3,4,60,NOW(), NOW())");
      await sequelize.query("INSERT INTO shoppings(inventory_id,unit_price,created_at,updated_at) VALUES(1,10,NOW(), NOW()),(2,20,NOW(), NOW());");
      //await sequelize.query("");
      //await sequelize.query("");
      //INSERT INTO payment_order_txns(id,status,amount,user_id,payment_type_id,payment_order_id,supplier_customer_id,created_at,updated_at,deleted_at) VALUES(1,'pending',1,1,1,1,1,'2024-01-01 19:20:15.425073-06','2024-01-01 19:20:15.425073-06',null);
      console.log('PRUEBAS: Datos de pruebas inicializados');
    } catch (error) {
      console.log('PRUEBAS: Error al inicializar la base:', error);
    }
  }
};



