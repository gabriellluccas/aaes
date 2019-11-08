import EmployeeHierarchy from "../abstract-class/employee-hierarchy";
import EmployeeChef from "./employee-chef";
import Order from "../../app/model/order";

export default class EmployeeWaiter extends EmployeeHierarchy {

    constructor() {
        super(new EmployeeChef(), 'Waiter');
    }

    nextDeliveryState(order: Order, cancel:boolean = false){
        if(order.deliveryState.name == 'DeliveryStateAwaitingApproval'){
            console.log(`${this.name} update the state of delivery in this order`)
            if(!cancel){
                order.inProduction();
            } else {
                order.cancel();
            }
        } else {
            console.log(`${this.name} don't have permission to update this order`);
            // this.nextEmployee.nextDeliveryState(order);
        }
    }

    cancelOrder(order: Order){
        if(order.deliveryState.name == 'DeliveryStateAwaitingApproval'){
            this.sendEmail(`Client cancel this order`, order.id, this.name);
            order.cancel();
        } else {
            this.nextEmployee.cancelOrder(order);
        }
    }

}