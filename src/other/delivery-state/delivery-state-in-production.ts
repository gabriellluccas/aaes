import DeliveryState from "../interface/delivery-state"
import Order from "../../app/model/order";
import DeliveryStateCanceled from "./delivery-state-canceled";
import DeliveryStateSent from "./delivery-state-sent";

export default class DeliveryStateInProduction implements DeliveryState{
    private _name:string = 'DeliveryStateInProduction';

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
        order.deliveryState = new DeliveryStateSent();
        return true;
    }
    done(order: Order) {
        return false;
    }


}