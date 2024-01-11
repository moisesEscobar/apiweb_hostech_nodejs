import {sucess_messages,keywords_traslations} from "../../constans/messages-sucess";
import config from '../env/index';

const HandlerSucess = {
    getSuccessMessage(key: string,type: string='') {
        const language: string = config.LENGUAGE;
        const type_translation = type ? keywords_traslations[type][language] : '';
        let message_template = sucess_messages[key][language];
        return message_template.replace("{type}", type_translation);
    }
}
export default HandlerSucess;