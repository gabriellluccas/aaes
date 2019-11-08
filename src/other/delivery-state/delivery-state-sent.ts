import DeliveryState from "../interface/delivery-state"
import Order from "../../app/model/order"
import DeliveryStateCanceled from "./delivery-state-canceled";
import DeliveryStateDone from "./delivery-state-done";

export default class DeliveryStateSent implements DeliveryState{
    private _name:string = 'DeliveryStateSent';

    get name(): string{
        return this._name;
    }

    awaitApproval(order: Order) {
        return false;
    }
    cancel(order: Order) {
        order.deliveryState = new DeliveryStateCanceled();
        return true;
    }
    inProduction(order: Order) {
        return false;
    }
    send(order: Order) {
        return false;
    }
    done(order: Order) {
        order.deliveryState = new DeliveryStateDone();
        return true;
    }


}