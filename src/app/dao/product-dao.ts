import Dao from "./dao";

class ProductDao extends Dao{
    private constructor(){
        super();
    }
    
    async selectById(id: number){
        const query = `select * from product where id = ${id}`;
        const result = await this.client.query(query).then(res => res);
        return result.rows[0];
    }

    async selectProductsByComboId(id: number){
        const query = `select * from combo_product inner join product on combo_product.id_product = product.id where combo_product.combo = ${id}`;
        const result = await this.client.query(query).then(res => res);
        return result.rows;
    }

    async selectAll(){
        const query = `select * from product`;
        const result = await this.client.query(query).then(res => res);
        return result.rows;        
    }
    
} export default ProductDao.getInstance();