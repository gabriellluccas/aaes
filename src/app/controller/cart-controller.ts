import Controller from "./controller";
import CreditCard from "../../other/payments-method/credit-card";
import DebitCard from "../../other/payments-method/debit-card";
import Money from "../../other/payments-method/money";
import { getUrl } from "../../other/helpers/functions";
import PaymentMethod from "../../other/interface/payment-method";
import Client from "../model/client";
import Product from "../model/product";

class ProductController extends Controller{
    
    private _clients: Array<Client>;

    private constructor(){
        super();
        this._clients = new Array<Client>();
    }

    insertProductIntoCart = async (req, res) => {
        const {clientId, productId} = getUrl(req.url).params;
        if(clientId && productId){
            const existingClient = this._clients.find(client => {return client.id == clientId;});
            const product = await Product.findById(productId);
            if(!existingClient){
                const client = await Client.findById(clientId);
                client.cart.push(product);
                this._clients.push(client);
            } else {
                existingClient.cart.push(product);
            }
        }
        res.end();
    }

    selectedPaymentMethod = async (req, res) => {
        const { clientId, method } = getUrl(req.url).params;
        const classes = {
            CreditCard: new CreditCard(),
            DebitCard: new DebitCard(),
            Money: new Money(),
        };
        const paymentMethod: PaymentMethod = classes[method[0]];
        const existingClient = this._clients.find(client => {return client.id == clientId;});
        const orderId = await existingClient.cart.finish(paymentMethod);
        this._clients.splice( this._clients.indexOf(existingClient), 1 );
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({orderId: orderId}));
    }


    
} export default ProductController.getInstance();