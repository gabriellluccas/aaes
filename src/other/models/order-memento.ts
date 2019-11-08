import DeliveryState from "../interface/delivery-state";

export default class OrderMemento{
    private _deliveryState: DeliveryState;
    private _id: number;
    
    constructor(params: any = {}){
        this._deliveryState = params.deliveryState;
        this._id = params.id;
    }

    /* Getters and Setters */

    get deliveryState(): DeliveryState {
        return this._deliveryState;
    }

    set deliveryState(deliveryState: DeliveryState){
        this._deliveryState = deliveryState;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number){
        this._id = id;
    }
}