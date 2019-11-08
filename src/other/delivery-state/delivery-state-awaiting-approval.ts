import DeliveryState from "../interface/delivery-state"
import Order from "../../app/model/order"
import DeliveryStateCanceled from "./delivery-state-canceled";
import DeliveryStateInProduction from "./delivery-state-in-production";

export default class DeliveryStateAwaitingApproval implements DeliveryState{
    private _name:string = 'DeliveryStateAwaitingApproval';

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
        order.deliveryState = new DeliveryStateInProduction();
        return true;
    }
    send(order: Order) {
        return false;
    }
    done(order: Order) {
        return false;
    }
}