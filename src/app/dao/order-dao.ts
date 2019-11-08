import Dao from "./dao";

class OrderDao extends Dao{
    private constructor(){
        super();
    }
    
    async insert(total: number){
        const query = `insert into order_delivery(delivery_state, total) values('DeliveryStateAwaitingApproval', ${total}) returning id`;
        const result = await this.client.query(query).then(res => res);
        return result.rows[0].id;
    }

    async insertProductIntoOrder(id_order: number, id_product: number){
        const query = `insert into order_product(id_order, id_product) values(${id_order}, ${id_product})`;
        const result = await this.client.query(query).then(res => res);
        return result.rows[0];        
    }

    async selectById(id: number){
        const query = `select * from order_delivery where id = ${id}`;
        const result = await this.client.query(query).then(res => res);
        return result.rows[0];
    }

    async select(id: number){
        const query = `select * from order_delivery`;
        const result = await this.client.query(query).then(res => res);
        return result.rows;
    }

    async selectByDeliveryState(delivery_state: string){
        const query = `select * from order_delivery where delivery_state = '${delivery_state}';`;
        console.log(query)
        const result = await this.client.query(query).then(res => res);
        return result.rows;
    }

    async updateDeliveryState(id: number, delivery_state: string){
        const query = `update order_delivery set delivery_state = '${delivery_state}' where id = ${id}`;
        const result = await this.client.query(query).then(res => res);
        return result.rows[0];
    }

    async insertOrderMemento(id_order, delivery_state: string = 'DeliveryStateAwaitingApproval'){
        const query = `insert into order_memento(id_order, delivery_state) values(${id_order}, '${delivery_state}')`;
        await this.client.query(query).then(res => res);
    }

    async selectOrderMementoByIdOrder(id_order: number){
        const query = `select * from order_memento where id_order = ${id_order} order by id asc`;
        const result = await this.client.query(query).then(res => res);
        return result.rows;        
    }

    async deleteLastMemento(id_order: number, id: number){
        const query = `delete from order_memento where id_order = ${id_order} and id = ${id}`;
        const result = await this.client.query(query).then(res => res);
    }

    
    
} export default OrderDao.getInstance();