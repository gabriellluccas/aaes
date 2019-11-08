import Nodemailer from "nodemailer";
require('dotenv').config();

import Person from "../../other/abstract-class/person";
import Observer from "../../other/interface/observer";
import Cart from "../../other/models/cart";
import ClientDao from "../dao/client-dao";

export default class Client extends Person implements Observer{
    private _cart: Cart;
    private _email: string;
    
    private constructor(params: any = {}) {
        super(params);
        this.email = params.email || null;
        this._cart = new Cart();
    }
    
    /* Dao Functions*/
    static async findById(id: number){
        const client = await ClientDao.selectById(id);
        return new Client(client); 
    }
    
    /* Getters and Setters */
    get cart(): Cart{
        return this._cart;
    }
    
    get email(): string{
        return this._email
    }
    
    set email(email: string){
        this._email = email;
    }
    
    /* Others Functions */    
    notify(message){
        const transporter = Nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: this.email,
            subject: 'Change delivery state',
            text: message
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}