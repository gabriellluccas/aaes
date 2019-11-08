import ProductDao from "../../app/dao/product-dao";
export default abstract class AbstractFactory {

    abstract newProduct(params);

    async createProduct(params: any){
        const product = await ProductDao.selectById(params.id);
        const {id, name, value, is_combo :isCombo} = product;
        return this.newProduct({id, name, value, is_combo :isCombo});
    }
}