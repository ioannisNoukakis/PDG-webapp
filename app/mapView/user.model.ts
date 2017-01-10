export class UserModel{
    constructor(
        public id: number,
        public username: string,
        public firstname: string,
        public lastname: string,
        public mail: string,
        public rank: number,
        public location: number[],
        public distance: number
    ){ }
}