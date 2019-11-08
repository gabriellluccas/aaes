
export default abstract class AbstractProduct {
    protected _id: number;
    protected _name: string;
    protected _value: number;
    protected _isCombo: boolean;

    constructor(params: any = {}){
        this._id = params.id || null;
        this._name = params.name || null;
        this._value = params.value || null;
        this._isCombo = params.isCombo || null;
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

    get value(): number{
        return this._value;
    }

    set value(value: number){
        this._value = value;
    }

    get isCombo(): boolean{
        return this._isCombo;
    }

    set isCombo(isCombo: boolean){
        this._isCombo = isCombo;
    }
}