import DeliveryState from "../../other/interface/delivery-state";
import DeliveryStateAwaitingApproval from "../../other/delivery-state/delivery-state-awaiting-approval";
import Observer from "../../other/interface/observer";
import Product from "./product";
import OrderMemento from "../../other/models/order-memento";
import OrderDao from "../dao/order-dao";
import { returnDeliveryStateByName } from "../../other/helpers/functions";
import ProductDao from "../dao/product-dao";


export default class Order{
    private _id: number;
    private _deliveryState: DeliveryState;
    private _observers: Observer[];
    private _products: Array<Product>;
    private _orderMemento: Array<OrderMemento>;
    private _total: number;
    
    constructor(params: any = {}) {
        this.id = params.id;
        this._deliveryState = params.deliveryState || new DeliveryStateAwaitingApproval();
        this.orderMemento = params.orderMemento || new Array<OrderMemento>();
        this._products = params.products || null;
        this._observers = new Array<Observer>();
        this._total = params.total || 0;
    }

    async updateDeliveryState(){
        await OrderDao.updateDeliveryState(this.id, this.deliveryState.name);
    }


    /* Getters and Setters */

    get id(): number{
        return this._id;
    }

    set id(id: number){
        this._id = id;
    }

    get deliveryState(): DeliveryState{
        return this._deliveryState;
    }

    set deliveryState(deliveryState: DeliveryState){
        this._deliveryState = deliveryState;
        this.updateDeliveryState();
    }

    get products(): Array<Product>{
        return this._products;   
    }

    set orderMemento(orderMemento: Array<OrderMemento>){
        this._orderMemento = orderMemento
    }

    get orderMemento(): Array<OrderMemento> {
        return this._orderMemento;
    }

    get total(): number {
        return this._total;
    }

    /* Observer Functions */

    addObserver(ob:Observer){
        this._observers.push(ob)
    }

    notifyObservers(message:String) {
        this._observers.map((obs) => {
            obs.notify(message);
        })
    }

    /* State Functions */

    changeDeliveryState(type, message){
        const deliveryState = new Function(`() => this._deliveryState.${type}()`);
        if(deliveryState){
            this.notifyObservers(message);
        }
    }

    cancel(){
        this.changeDeliveryState('cancel',"Your order has been canceled");
    }
    
    inProduction(){
        this.changeDeliveryState('inProduction',"Your order is in production");
    }
    
    send(){
        this.changeDeliveryState('send',"Your order has been sent");
    }
    
    done(){
        this.changeDeliveryState('done',"The order is in your home!");
    }

    /* Memento Functions */
    async rollbackMemento(){
        this._deliveryState = this.orderMemento[this.orderMemento.length - 1].deliveryState;
        await OrderDao.updateDeliveryState(this.id, this.deliveryState.name);
    }
}