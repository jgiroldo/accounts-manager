import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService: MessageService) { }

  openAlert(severityStr: string, summaryStr: string, detailStr: string) {
    this.messageService.add({ severity: severityStr, summary: summaryStr, detail: detailStr });
  }
}
