import EmployeeHierarchy from "../abstract-class/employee-hierarchy";
import Order from "../../app/model/order";

export default class EmployeeMotoboy extends EmployeeHierarchy {
    
    public constructor() {
        super(null, 'Motoboy');
    }

    nextDeliveryState(order: Order, cancel:boolean = false){
        if(order.deliveryState.name == 'DeliveryStateSent'){
            console.log(`${this.name} update the state of delivery in this order`);
            if(!cancel){
                order.done();
            } else {
                order.cancel();
            }
        } else {
            console.log(`${this.name} don't have permission to update this order`);
        }
    }

    cancelOrder(order: Order){
        if(order.deliveryState.name == 'DeliveryStateSent'){
            this.sendEmail(`Client cancel this order`, order.id, this.name);
            order.cancel();
        } else {
            this.nextEmployee.cancelOrder(order);
        }
    }

}
