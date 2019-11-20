import EmployeeHierarchy from "../abstract-class/employee-hierarchy";
import EmployeeMotoboy from "./employee-motoboy";
import Order from "../../app/model/order";

export default class EmployeeChef extends EmployeeHierarchy {
    public constructor() {
        super(new EmployeeMotoboy(), 'Chef');
    }

    cancelOrder(order: Order){
        return order.deliveryState.name == 'DeliveryStateInProduction';
    }

}