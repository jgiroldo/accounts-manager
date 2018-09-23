export class Person {
    id: number;
    cpf_cnpj: string;
    name: string;
    birth_date: string | Date;
    social_name: number;
    company_name: number;

    constructor(p: any) {
        this.id = p.id;
        this.cpf_cnpj = p.cpf_cnpj;
        this.name = p.name;
        this.birth_date = p.birth_date;
        this.social_name = p.social_name;
        this.company_name = p.company_name;
    }
}
