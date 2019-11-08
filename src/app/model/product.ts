import AbstractProduct from "../../other/abstract-class/abstract-product";
import ProductDao from "../dao/product-dao";

export default class Product extends AbstractProduct{
    
    constructor(params: any = {}){
        super(params);
    }

    /* Dao Functions */
    static async findById(id: number){
        const {is_combo ,...product} = await ProductDao.selectById(id);
        product.isCombo = is_combo; 
        return new Product(product);
    }
}