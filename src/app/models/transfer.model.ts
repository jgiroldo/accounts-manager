import { Person } from './person.model';

export class Transfer {
    source_id: number;
    destiny_id: number;
    value: number;

    constructor(t: any) {
        this.source_id = t.source_id;
        this.destiny_id = t.destiny_id;
        this.value = t.value;
    }
}
