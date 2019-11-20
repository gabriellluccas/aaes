import EmployeeHierarchy from "../abstract-class/employee-hierarchy";
import EmployeeChef from "./employee-chef";
import Order from "../../app/model/order";

export default class EmployeeWaiter extends EmployeeHierarchy {

    constructor() {
        super(new EmployeeChef(), 'Waiter');
    }

    cancelOrder(order: Order){
        return order.deliveryState.name == 'DeliveryStateAwaitingApproval';
    }

}