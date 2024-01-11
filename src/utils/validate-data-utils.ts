import { Op } from "sequelize";
import { ErrorRate } from "../config/error";

const Utils = {
    validateFieldRangeParams(params: any, whereClause: { [key: string]: any }) {
        Utils.validateDateToCurrent(params['init_date'],2);
        if (params['type_date'] && (params['init_date'] || params['end_date'])) {
            if (params['end_date'] < params['init_date']) {
                throw new ErrorRate("date_start_less");
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
            throw new ErrorRate("date_required_type");
        } else if (params['type_date'] && (!params['init_date'] && !params['end_date'])) {
            throw new ErrorRate("date_required");
        }
        if (params['field_type'] && (params['initial_value'] || params['end_value'])) {
            if (params['end_value'] < params['initial_value']) {
                throw new ErrorRate("value_start_less");
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
            throw new ErrorRate("value_required_type");
        } else if (params['field_type'] && (!params['initial_value'] && !params['end_value'])) {
            throw new ErrorRate("value_required");
        }
        return whereClause;
    },
    validateFieldsParams(key: string, value: string, operator: symbol, whereClause: { [key: string]: any }) {
        if (value) {
            whereClause[key] = { [operator]: (operator === Op.iLike ? `%${value}%` : value) };
        }
    },
    validateDateToCurrent(date: Date,type:number) {
        const date_new = new Date(`${date}T00:00:00`);
        const current_date = new Date();
        date_new.setHours(0, 0, 0, 0);
        current_date.setHours(0, 0, 0, 0);

        if (date_new > current_date) {
            if(type==1){
                throw new ErrorRate("date_less_currentdate");
            }else if(type==2){
                throw new ErrorRate("date_start_less_currentdate");
            }
        }
    }

}
export default Utils;