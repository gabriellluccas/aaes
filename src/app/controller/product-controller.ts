import Controller from "./controller";

import ProductDao from "../dao/product-dao";
import ProductFactory from "../../other/models/product-factory";
import ComboFactory from "../../other/models/combo-factory";

class ProductController extends Controller{
    private constructor(){
        super();
    }
    
    async index (req, res) {    
        let products = await ProductDao.selectAll();
        products = await products.map(async element => {
            if(element.is_combo){
                return await ComboFactory.newProduct(element);
            } else {
                return await ProductFactory.newProduct(element);
            }
        });
        Promise.all(products).then((result: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });
    }

    menuView(req, res){
        super.render('products.js', res);
        res.end();
    }
} export default ProductController.getInstance();