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
    
    private constructor(params: any = {}) {
        this.id = params.id;
        this._deliveryState = params.deliveryState || new DeliveryStateAwaitingApproval();
        this.orderMemento = params.orderMemento || new Array<OrderMemento>();
        this._products = params.products || null;
        this._observers = new Array<Observer>();
        this._total = params.total || 0;
    }

    /* Dao Functions */
    static async findById(id: number){
        const order = await OrderDao.selectById(id);
        const orderMemento = new Array<OrderMemento>();
        const mementoMap = await OrderDao.selectOrderMementoByIdOrder(order.id)
            mementoMap.map(
                element => {
                    let {id, delivery_state :deliveryState} = element;
                    deliveryState = returnDeliveryStateByName(deliveryState);
                    orderMemento.push(new OrderMemento({id, deliveryState}));
                });
        order.orderMemento = orderMemento;
        order.deliveryState = returnDeliveryStateByName(order.delivery_state);
        return new Order(order);
    }

    static async newOrder(products: Array<Product>, total: number){
        const orderId = await OrderDao.insert(total);
        await products.forEach(async product => {
            console.log(product);
            if(product.isCombo){
                let combo = await ProductDao.selectProductsByComboId(product.id)
                combo = combo.map(element => {
                    return OrderDao.insertProductIntoOrder(orderId, element.id);    
                });
            } else {
                return OrderDao.insertProductIntoOrder(orderId, product.id);
            }
        });
        await OrderDao.insertOrderMemento(orderId);
        return orderId;
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
        this.pushMemento();
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

    cancel(){
        const deliveryState = this._deliveryState.cancel(this);
        if(deliveryState){
            this.notifyObservers("Your order has been canceled");
        }
    }
    
    inProduction(){
        const deliveryState = this._deliveryState.inProduction(this);
        if(deliveryState){
            this.notifyObservers("Your order is in production");
        }
    }
    
    send(){
        const deliveryState = this._deliveryState.send(this);
        if(deliveryState){
            this.notifyObservers("Your order has been sent");
        }
    }
    
    done(){
        const deliveryState = this._deliveryState.done(this);
        if(deliveryState){
            this.notifyObservers("The order is in your home!");
        }
    }

    /* Memento Functions */

    pushMemento(){

    }

    async rollbackMemento(){
        this._deliveryState = this.orderMemento[this.orderMemento.length - 1].deliveryState;
        await OrderDao.updateDeliveryState(this.id, this.deliveryState.name);
    }
}