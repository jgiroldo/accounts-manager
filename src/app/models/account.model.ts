import { Person } from './person.model';

export class Account {
    id: number;
    creation_date: string | Date;
    parent_account: number;
    master_account: number;
    status: number;
    person_id: number;
    person: Person;
    name: string;
    balance: number;

    constructor(acc: any) {
        this.id = acc.id;
        this.creation_date = acc.creation_date;
        this.parent_account = acc.parent_account;
        this.master_account = acc.master_account;
        this.status = acc.status;
        this.person_id = acc.person_id;
        this.person = acc.person;
        this.name = acc.name;
        this.balance = acc.balance;
    }
}
