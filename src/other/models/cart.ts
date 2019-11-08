import PaymentMethod from "../interface/payment-method";
import Order from "../../app/model/order";
import Product from "../../app/model/product";

export default class Cart{
    private _products: Array<Product>;

    constructor(){
        this._products = new Array<Product>();
    }

    /* Getters and Setters */
    get products(): Array<Product>{
        return this._products;
    }
    
    /* Others Functions */

    async finish(paymentMethod: PaymentMethod){        
        return paymentMethod.executePayment(this);
    }

    push(product: Product) {
        this._products.push(product);
    }

    clear(){
        this._products = new Array<Product>();
    }
    
}