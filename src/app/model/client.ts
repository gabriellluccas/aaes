import Nodemailer from "nodemailer";
require('dotenv').config();

import Person from "../../other/abstract-class/person";
import Observer from "../../other/interface/observer";
import ClientDao from "../dao/client-dao";
import PaymentMethod from "../../other/interface/payment-method";
import Product from "../../app/model/product";

export default class Client extends Person implements Observer{
    private _cart: Array<Product>;
    private _email: string;
    
    private constructor(params: any = {}) {
        super(params);
        this.email = params.email || null;
        this._cart = new Array<Product>();
    }

    async finish(paymentMethod: PaymentMethod){        
        return paymentMethod.executePayment(this);
    }

    push(product: Product) {
        this._cart.push(product);
    }

    clear(){
        this._cart = new Array<Product>();
    }
    
    /* Getters and Setters */
    get cart(): Array<Product>{
        return this._cart;
    }
    
    get email(): string{
        return this._email
    }
    
    set email(email: string){
        this._email = email;
    }
    
    /* Dao Functions*/
    static async findById(id: number){
        const client = await ClientDao.selectById(id);
        return new Client(client); 
    }
    
    /* Others Functions */    
    notify(message){
        const transporter = this.transporter();
        
        transporter.sendMail(this.mailOptions(message), function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    transporter(){
        return Nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    }

    mailOptions(message){
        return {
            from: process.env.EMAIL,
            to: this.email,
            subject: 'Change delivery state',
            text: message
        };
    }
}