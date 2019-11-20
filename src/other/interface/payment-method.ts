import {newOrder} from "../../other/models/order-factory";
import Client from "../../app/model/client";

export default abstract class PaymentMethod{
    valueToChange: number;

    async executePayment(client: Client){
        let total = 0;
        client.cart.forEach((product) => {
            total =+ product.value;
        });
        const orderId = await newOrder(client.cart, total*this.valueToChange);
        client.clear();
        return orderId;
    }
}