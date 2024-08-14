export interface DessertProps {
    id:number,
    image: Object | any,
    name: string,
    category: string,
    price: number

}

export interface CartItem{
    id:number,
    name:string,
    quantity:number,
    price:number,
    image?: Object | any,
}