import Controller from "./controller";
import { getUrl } from "../../other/helpers/functions";
import Client from "../model/client";
import EmployeeWaiter from "../../other/employee-hierarchy/employee-waiter";
import OrderDao from "../dao/order-dao";
import {findById} from "../../other/models/order-factory";



class OrderController extends Controller{
    private constructor(){
        super();
    }

    async changeDeliveryState(req, res){
        const params = getUrl(req.url).params;
        const order = await findById(params.orderId);
        const client = await Client.findById(params.clientId);
        order.addObserver(client);
        switch(params.deliveryState[0]){
            case 'DeliveryStateDone':    
                order.done();
                break;
            case 'DeliveryStateInProduction':
                order.inProduction();
                break;
            case 'DeliveryStateSent':
                order.send();
                break; 
            case 'DeliveryStateCanceled':
                order.cancel();
                break;
        }
        res.end();
    }

    async rollbackDeliveryState(req, res){
        const params = getUrl(req.url).params;
        const order = await findById(params.orderId);
        order.rollbackMemento();
        res.end();
    }

    async requestCancelOrder(req, res){
        const params = getUrl(req.url).params;
        console.log(params);
        const order = await findById(params.orderId[0]);
        const employee = new EmployeeWaiter(); 
        employee.cancelOrder(order);
        res.end();
    }

    async getAllOrdersByDelieryState(req, res){
        const params = getUrl(req.url).params;
        const order = await OrderDao.selectByDeliveryState(params.deliveryState);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(order));
    }

    async getAllOrders(req, res){
        const order = await OrderDao.select();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(order));
    }

    waiterView(req, res){
        super.render('waiter.js', res);
        res.end();
    }

    chefView(req, res){
        super.render('chef.js', res);
        res.end();
    }

    motoboyView(req, res){
        super.render('motoboy.js', res);
        res.end();
    }

    godView(req, res){
        super.render('memento.js', res);
        res.end();
    }



} export default OrderController.getInstance();