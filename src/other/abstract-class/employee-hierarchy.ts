import Nodemailer from "nodemailer";
require('dotenv').config();

import Person from "./person";
import Order from "../../app/model/order";

export default abstract class EmployeeHierarchy extends Person {
    protected nextEmployee: EmployeeHierarchy;
    
    constructor(nextEmployee: EmployeeHierarchy = null, name: string){
        super();
        this.nextEmployee = nextEmployee;
        this.name = name;
    }
    
    sendEmail(message, orderId, name){
        const transporter = Nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL_EMPLOYEE,
            subject: `Employee: ${name}, order: ${orderId}`,
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
    
    templateCancelOrder(order: Order){
        if(this.cancelOrder(order)){
            this.sendEmail(`Client cancel this order`, order.id, this.name);
            order.cancel();
        } else {
            this.nextEmployee.cancelOrder(order);
        }
    }
    
    abstract cancelOrder(order: Order);
}