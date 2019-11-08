import Connection from '../../database';

export default class Dao{
    private static instance: any;
    protected client: any;

    protected constructor(){
        this.client = Connection.getDriver();
    }
    
    static getInstance(){
        if(!this.instance)
            this.instance = new this;            
        return this.instance;
    }
}
