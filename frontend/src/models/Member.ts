export class Member {
    constructor(
        public id: number = 0,
        public first_name: string = "",
        public last_name: string = "",
        public tc_number: string = "",
        public phone: string = "",
        public created_at: string = "",
        public updated_at: string = "",
        public addresses: [] = []
    ) {
    }
}