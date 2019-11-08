import PaymentMethod from "../interface/payment-method";
import Cart from "../models/cart";
import Order from "../../app/model/order";

export default class Money implements PaymentMethod{

    async executePayment(cart: Cart){
        let total = 0;
        cart.products.forEach((product) => {
            total =+ product.value;
        });
        const orderId = await Order.newOrder(cart.products, total*0.9);
        cart.clear();
        return orderId;

    }   
}