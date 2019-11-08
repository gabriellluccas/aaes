import EmployeeHierarchy from "../abstract-class/employee-hierarchy";
import EmployeeMotoboy from "./employee-motoboy";
import Order from "../../app/model/order";

export default class EmployeeChef extends EmployeeHierarchy {
    public constructor() {
        super(new EmployeeMotoboy(), 'Chef');
    }

    nextDeliveryState(order: Order, cancel:boolean = false){
        if(order.deliveryState.name == 'DeliveryStateInProduction'){
            console.log(`${this.name} update the state of delivery in this order`);
            if(!cancel){
                order.send();
            } else {
                order.cancel();
            }
        } else {
            console.log(`${this.name} don't have permission to update this order`);
        }
    }

    cancelOrder(order: Order){
        if(order.deliveryState.name == 'DeliveryStateInProduction'){
            this.sendEmail(`Client cancel this order`, order.id, this.name);
            order.cancel();
        } else {
            console.log(`${this.name} don't have permission to cancel this order`);
            this.nextEmployee.cancelOrder(order);
        }
    }

}