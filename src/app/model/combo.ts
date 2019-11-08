import Product from "./product";

export default class Combo extends Product{
    private _products: Array<Product>;

    public constructor(params: any = {}) {
        super(params);
        this._products = params.products;
    }

    get products(): Array<Product>{
        return this.products;
    }
}
