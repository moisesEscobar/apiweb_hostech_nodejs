

Creacion de vistas:
    *
        CREATE VIEW view_users AS
        SELECT * FROM users where deleted_at is null;
    *
        CREATE VIEW view_brands AS
        SELECT * FROM brands where deleted_at is null;
    *
        CREATE VIEW view_products AS
        SELECT
            prds.id,
            prds.name,
            prds.key,
            prds.created_at,
            prds.updated_at,
            prds.brand_id AS brand_id,
            (SELECT name FROM brands WHERE id=prds.brand_id ) AS brand_name
        FROM products prds
        WHERE prds.deleted_at is null;

    *
        CREATE VIEW view_logs  AS
        SELECT
            lv.id id,
            lv.action,
            lv.catalog,
            lv.detail_last,
            lv.detail_new,
            u.id user_id,
            u.name user_name,
            u.last_name user_last_name,
            u.email user_email,
            lv.created_at,
            lv.updated_at
        FROM logs lv
        JOIN users u ON lv.user_id = u.id
        WHERE lv.deleted_at is null
        Order by lv.id desc;

    *
        CREATE VIEW view_brands_with_products AS
        SELECT * FROM view_brands vb WHERE EXISTS ( SELECT 1 FROM products WHERE vb.id = products.brand_id and deleted is null);
    *
        CREATE OR REPLACE FUNCTION public.create_log(p_user_id integer, p_action character varying, p_catalog character varying, p_detail_last jsonb, p_detail_new jsonb)
        RETURNS void
        LANGUAGE plpgsql
        AS $function$
        BEGIN
            INSERT INTO logs (user_id, action, catalog, detail_last, detail_new, created_at,updated_at)
            VALUES (p_user_id, p_action, p_catalog, p_detail_last, p_detail_new, NOW()),NOW();
        END;
        $function$

