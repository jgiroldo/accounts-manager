import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { HttpService } from '../services/http.service';
import { Account } from '../models/account.model';
import { AlertService } from '../services/alert.service';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder } from 'node_modules/@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accountsList: any;
  accountGridList: TreeNode[];
  filterForm: FormGroup;
  filterObj = new Account({});

  constructor(private httpService: HttpService, private alert: AlertService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.filter();
  }

  buildForm() {
    this.filterForm = this.fb.group({
      'name': [this.filterObj.name],
    });
  }

  filter() {
    const params = new HttpParams().set('name', this.filterObj.name ? this.filterObj.name : '');
    this.httpService.doGet(environment.accounts_url, { params: params }).subscribe(
      data => {
        this.accountsList = data;
        this.convertToHierarchy(this.accountsList);
      },
      err => {
        this.alert.openAlert('error', 'Erro', err);
      }
    );
  }

  convertToHierarchy(accountList: Account[]) {
    this.accountGridList = this.createStructure(accountList);

    for (var i = this.accountGridList.length - 1; i >= 0; i--) {
      var currentNode = this.accountGridList[i];
      if (!currentNode.data.parent_account || currentNode.data.parent_account === "") {
        continue;
      }
      var parent = this.getParent(currentNode, this.accountGridList);

      if (parent === null) {
        continue;
      }

      parent.children.push(currentNode);
      this.accountGridList.splice(i, 1);
    }
    return this.accountGridList;
  }

  createStructure(nodes) {
    var objects = [];

    for (var i = 0; i < nodes.length; i++) {
      objects.push({ data: nodes[i], children: [] });
    }

    return objects;

  }

  getParent(child, nodes) {
    var parent = null;

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].data.id === child.data.parent_account) {
        return nodes[i];
      }
    }

    return parent;
  }

  edit(id) {
    this.router.navigate(['/accounts/' + id]);
  }

}
