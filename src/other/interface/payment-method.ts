import Cart from "../models/cart";

export default interface PaymentMethod{
    executePayment(cart: Cart): void
}