import DeliveryState from "../interface/delivery-state"
import Order from "../../app/model/order"

export default class DeliveryStateDone implements DeliveryState{
    private _name:string = 'DeliveryStateDone';

    get name(): string{
        return this._name;
    }

    awaitApproval(order: Order) {
        return false;
    }
    cancel(order: Order) {
        return false;
    }
    inProduction(order: Order) {
        return false;
    }
    send(order: Order) {
        return false;
    }
    done(order: Order) {
        return false;
    }


}