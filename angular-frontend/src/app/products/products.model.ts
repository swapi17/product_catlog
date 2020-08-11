import { Category } from "../category/category.model";


export class Product{
    
    public _id: string;
    public name: string;
    public description: string;
    public price: string;
    public category: string;



    constructor(name:string,category:string,desc:string,price:string){
         this.name = name;
         this.category = category;
         this.description = desc;
         this.price = price;
    }

}