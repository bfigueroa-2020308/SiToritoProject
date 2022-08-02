export class ReservacionModel{
    constructor(
        public fecha : Date,
        public stockReservado: number,
        public productos: string,
        public mesa: string,
        public usuario: string,
        public total:number
    ){}
}