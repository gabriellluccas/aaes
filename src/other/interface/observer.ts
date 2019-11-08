import Order from "../../app/model/order";

export default interface Observer {
    notify(message);
}