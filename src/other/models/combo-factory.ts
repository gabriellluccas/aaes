import Product from "../../app/model/product";
import AbstractFactory from "../abstract-class/abstract-factory";
import ProductDao from "../../app/dao/product-dao";
import Combo from "../../app/model/combo";

class ComboFactory extends AbstractFactory {
    private static instance: ComboFactory;
    
    async newProduct(params: any){
        let products = await ProductDao.selectProductsByComboId(params.id);
        params.products = products.map(element => {
            const {id, name, value, isCombo} = element;
            return new Product({id, name, value, isCombo});
        });
        return new Combo(params);        
    }

    static getInstance(){
        if(!this.instance)
            this.instance = new this;            
        return this.instance;
    }

} export default ComboFactory.getInstance();