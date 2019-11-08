import Dao from "./dao";

class ClientDao extends Dao{
    private constructor(){
        super();
    }
    
    async selectById(id){
        const query = `select * from client where id = ${id}`;
        const result = await this.client.query(query).then(res => res);
        return result.rows[0];
    }
    
} export default ClientDao.getInstance();