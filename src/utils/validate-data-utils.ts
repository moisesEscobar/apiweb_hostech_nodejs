import { Op } from "sequelize";

const Utils = {
    validateFieldRangeParams(params: any, whereClause: { [key: string]: any }) {
        Utils.ValidateDateToCurrent(params['init_date'],2);
        if (params['type_date'] && (params['init_date'] || params['end_date'])) {
            if (params['end_date'] < params['init_date']) {
                throw new Error("La fecha inicial debe ser menor a la fecha final");
            }
            if (params['init_date'] && params['end_date']) {
                whereClause[params['type_date']] = {
                    [Op.gte]: new Date(`${params['init_date']}T00:00:00Z`),
                    [Op.lte]: new Date(`${params['end_date']}T23:59:59Z`),
                };
            } else if (params['init_date']) {
                whereClause[params['type_date']] = {
                    [Op.gte]: new Date(`${params['init_date']}T00:00:00Z`)
                };
            } else if (params['end_date']) {
                whereClause[params['type_date']] = {
                    [Op.lte]: new Date(`${params['end_date']}T23:59:59Z`),
                };
            }
        } else if (!params['type_date'] && (params['init_date'] || params['end_date'])) {
            throw new Error("Se debe especificar un tipo de fecha");
        } else if (params['type_date'] && (!params['init_date'] && !params['end_date'])) {
            throw new Error("Se debe especificar una fecha inicial o final");
        }
        if (params['field_type'] && (params['initial_value'] || params['end_value'])) {
            if (params['end_value'] < params['initial_value']) {
                throw new Error("El valor inicial debe ser menor al valor final");
            }
            if (params['initial_value'] && params['end_value']) {
                whereClause[params['field_type']] = {
                    [Op.gte]: params['initial_value'],
                    [Op.lte]: params['end_value'],
                };
            } else if (params['initial_value']) {
                whereClause[params['field_type']] = { [Op.gte]: params['initial_value'] };
            } else if (params['end_value']) {
                whereClause[params['field_type']] = { [Op.lte]: params['end_value'] };
            }
        } else if (!params['field_type'] && (params['initial_value'] || params['end_value'])) {
            throw new Error("Se debe especificar un tipo de campo");
        } else if (params['field_type'] && (!params['initial_value'] && !params['end_value'])) {
            throw new Error("Se debe especificar un valor inicial o final");
        }
        return whereClause;
    },
    validateFieldsParams(key: string, value: string, operator: symbol, whereClause: { [key: string]: any }) {
        if (value) {
            whereClause[key] = { [operator]: (operator === Op.iLike ? `%${value}%` : value) };
        }
    },
    ValidateDateToCurrent(date: Date,type:number) {
        const date_new = new Date(`${date}T00:00:00`);
        const current_date = new Date();
        date_new.setHours(0, 0, 0, 0);
        current_date.setHours(0, 0, 0, 0);

        if (date_new > current_date) {
            if(type==1){
                throw new Error("La fecha debe ser menor o igual a la fecha actual");
            }else if(type==2){
                console.log("ERROR")
                throw new Error("La fecha inicial debe ser menor o igual a la fecha actual");
            }
        }
    }

}
export default Utils;