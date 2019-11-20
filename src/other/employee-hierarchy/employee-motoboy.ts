import EmployeeHierarchy from "../abstract-class/employee-hierarchy";
import Order from "../../app/model/order";

export default class EmployeeMotoboy extends EmployeeHierarchy {
    
    public constructor() {
        super(null, 'Motoboy');
    }

    cancelOrder(order: Order){
        order.deliveryState.name == 'DeliveryStateSent';
    }
}
