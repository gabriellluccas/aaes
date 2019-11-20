import Order from "../../app/model/order";
import { returnDeliveryStateByName } from "../helpers/functions";
import OrderMemento from "./order-memento";
import OrderDao from "../../app/dao/order-dao";
import Product from "../../app/model/product";
import ProductDao from "../../app/dao/product-dao";

export const findById = async (id: number) => {
    const order = await OrderDao.selectById(id);
    const orderMemento = new Array<OrderMemento>();
    const mementoMap = await OrderDao.selectOrderMementoByIdOrder(order.id)
        mementoMap.map(
            element => {
                let {id, delivery_state :deliveryState} = element;
                deliveryState = returnDeliveryStateByName(deliveryState);
                orderMemento.push(new OrderMemento({id, deliveryState}));
            });
    order.orderMemento = orderMemento;
    order.deliveryState = returnDeliveryStateByName(order.delivery_state);
    return new Order(order);
}

export const newOrder = async (products: Array<Product>, total: number) => {
    const orderId = await OrderDao.insert(total);
    products.forEach(async (product) => {
        console.log(product);
        if (product.isCombo) {
            let combo = await ProductDao.selectProductsByComboId(product.id);
            combo = combo.map(element => {
                return OrderDao.insertProductIntoOrder(orderId, element.id);
            });
        }
        else {
            return OrderDao.insertProductIntoOrder(orderId, product.id);
        }
    });
    await OrderDao.insertOrderMemento(orderId);
    return orderId;
}

