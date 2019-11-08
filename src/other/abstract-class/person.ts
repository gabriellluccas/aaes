export default abstract class Person {
    protected _id: number;
    protected _name: string;

    constructor(params: any = {}){
        this.id = params.id || null;
        this.name = params.name || null;
    }

    /* Getters and Setters */
    get id(): number{
        return this._id;
    }

    set id(id: number){
        this._id = id;
    }

    get name(): string{
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }
}