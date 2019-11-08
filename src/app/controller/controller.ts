import { ServerResponse } from 'http';

export default class Controller{
    private static instance: any;

    protected render(file: string, res: ServerResponse){
        res.write(`
            <!DOCTYPE html>  
            <html>  
                <head>  
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <link rel="stylesheet" href="/assets/font-awesome/css/font-awesome.min.css">
                    <link rel="stylesheet" href="/assets/css/styles.css">
                    <title>Ifood-like</title> 
                    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
                    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
                    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
                    <script type="text/babel" src="views/${file}"></script>
                </head>  
                <body>      
                    <div id="react-component"></div>
                </body>  
            </html>  
        `)
    }

    static getInstance(){
        if(!this.instance)
            this.instance = new this;            
        return this.instance;
    }
}
