import {mock} from '@/axios';

export  class CommonService {

    public  getActivityDetails() {
        // Use vue-resource or any other http library to send your request
        alert(mock);
    }
}
export const commonService = new CommonService();
