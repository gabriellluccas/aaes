import pg from 'pg';

class Connection{
    private static instance: Connection;
    private driver: any;
    private configs: {};
    
    private constructor(){
        this.configs = {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'aaes',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres'
        };
        this.driver = this.postgresDriver();
        this.driver.connect();
    }
    
    static getInstance(){
        console.log('Starting connection with database');
        if(!Connection.instance)
            Connection.instance = new Connection();
        return Connection.instance;
    }
    
    private postgresDriver(){
        const { Client } = pg;
        const client = new Client(this.configs);
        return client;
    }

    getDriver(){
        return this.driver;
    }
}
export default Connection.getInstance();