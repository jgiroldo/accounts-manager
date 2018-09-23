import { Account } from './account.model';

export class Transaction {
    id: string;
    operation_date: string | Date;
    operation_type: number;
    source_account_id: number;
    source_account: Account;
    destiny_account_id: number;
    destiny_account: Account;
    value: number;
    is_reversed: boolean;

    constructor(t: any) {
        this.id = t.id;
        this.operation_date = t.operation_date;
        this.operation_type = t.operation_type;
        this.source_account_id = t.source_account_id;
        this.source_account = t.source_account;
        this.destiny_account_id = t.destiny_account;
        this.value = t.value;
        this.is_reversed = t.is_reversed;
    }
}
