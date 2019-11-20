import PaymentMethod from "../interface/payment-method";

export default class CreditCard extends PaymentMethod{
    constructor(){
        super();
        this.valueToChange = 1.1;
    }
}