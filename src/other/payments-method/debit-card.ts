import PaymentMethod from "../interface/payment-method";

export default class DebitCard extends PaymentMethod{
    constructor(){
        super();
        this.valueToChange = 0.9;
    }
}