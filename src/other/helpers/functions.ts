import * as Url from 'url';
import DeliveryStateAwaitingApproval from '../delivery-state/delivery-state-awaiting-approval';
import DeliveryStateDone from '../delivery-state/delivery-state-done';
import DeliveryStateInProduction from '../delivery-state/delivery-state-in-production';
import DeliveryStateSent from '../delivery-state/delivery-state-sent';
import DeliveryStateCanceled from '../delivery-state/delivery-state-canceled';
import EmployeeChef from '../employee-hierarchy/employee-chef';
import EmployeeWaiter from '../employee-hierarchy/employee-waiter';
import EmployeeMotoboy from '../employee-hierarchy/employee-motoboy';

export function getUrl(url){
    let {href, host, query, pathname} = Url.parse(url); 
    
    let searchParams = new Url.URLSearchParams(query);
    let params = [];
    searchParams.forEach((value, name)=>{
        params[name] = searchParams.getAll(name); 
    });
    url = {href, host, pathname, params};
    return url;
};

export function returnDeliveryStateByName(deliveryState){
    switch(deliveryState){
        case 'DeliveryStateAwaitingApproval':
            return new DeliveryStateAwaitingApproval();
        case 'DeliveryStateDone':
            return new DeliveryStateDone();
        case 'DeliveryStateInProduction':
            return new DeliveryStateInProduction();
        case 'DeliveryStateSent':
            return new DeliveryStateSent(); 
        case 'DeliveryStateCanceled':
            return new DeliveryStateCanceled();
    }
}

export function returnEmployeeByName(employeeType){
    switch(employeeType){
        case 'EmployeeChef':
            return new EmployeeChef();
        case 'EmployeeWaiter':
            return new EmployeeWaiter();
        case 'EmployeeMotoboy':
            return new EmployeeMotoboy();
    }
}
