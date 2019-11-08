import Order from '../../app/model/order';

export default interface DeliveryState{
    name: string;
    cancel(order: Order): any;
    awaitApproval(order: Order): any;
    inProduction(order: Order): any;
    send(order: Order): any;
    done(order: Order): any;
}