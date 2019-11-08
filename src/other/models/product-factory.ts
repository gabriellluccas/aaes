import Product from "../../app/model/product";
import AbstractFactory from "../abstract-class/abstract-factory";

class ProductFactory extends AbstractFactory {
    private static instance: ProductFactory;
    
    async newProduct(params: any){
            return new Product(params);
    }

    static getInstance(){
        if(!this.instance)
            this.instance = new this;            
        return this.instance;
    }

} export default ProductFactory.getInstance();