export class ProductoModel{
    constructor(
        public nombre: string,
        public descripcion: string,
        public stock:number,
        public precio:number,
        public categoria:string
    ){}
}