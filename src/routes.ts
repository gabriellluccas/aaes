import ProductController from './app/controller/product-controller';
import CartController from './app/controller/cart-controller';
import { getUrl } from './other/helpers/functions';
import OrderController from './app/controller/order-controller';


class Routes {
    private static instance: Routes;
    private routes: any = null;
    
    private constructor() {
        this.routesList();
    }
    
    static getInstance() {
        if (!Routes.instance) {
            console.log('Starting routes');
            Routes.instance = new Routes();
        }
        return Routes.instance;
    }
    
    executeRoute(req, res){
        if (req.url !== '/favicon.ico') {
            const url = getUrl(req.url);
            console.log(url.pathname);
            let controllerCallback = this.routes.find((value) => value.name === url.pathname);
            // console.log(controllerCallback)
            controllerCallback.callback(req, res);
        }
    }

    private routesList(){
        this.routes = [
            {name:'/', callback: ProductController.menuView}, 
            {name:'/view', callback: OrderController.userView}, 
            {name:'/products', callback: ProductController.index}, 
            {name:'/cart/add', callback: CartController.insertProductIntoCart},
            {name:'/view/cart/finish', callback: CartController.finishCartView},
            {name:'/cart/finish', callback: CartController.selectedPaymentMethod},
            {name:'/order/state/change', callback: OrderController.changeDeliveryState},
            {name:'/order/state/rollback', callback: OrderController.rollbackDeliveryState},
            {name:'/order/state', callback: OrderController.getAllOrdersByDelieryState},
            {name:'/order/cancel', callback: OrderController.requestCancelOrder},
            {name:'/order', callback: OrderController.getAllOrders},
        ];    
    }
}
export default Routes.getInstance(); 