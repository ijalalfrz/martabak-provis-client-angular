import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../services/auth.service';
import { TransaksiService } from '../../services/transaksi.service';

import { TransaksiDetail } from '../../models/TransaksiViewModel'


import {LoaderComponent} from '../../loader/loader.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listData:TransaksiDetail[];
  loading_data:boolean;


  constructor(private transaksiService:TransaksiService, private authService:AuthService, private storage:LocalStorageService, private router:Router) {
    this.listData = new Array<TransaksiDetail>();
    Observable.interval(5000).subscribe(x => {
      this.getAll();
    });

  }

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['admin/']);
    }
    this.getAll();
  }

  done(id){
    this.loading_data = true;

    this.transaksiService.updateStatus(id).subscribe(
      data => {
        this.loading_data = false;
        this.getAll();
      },
      err => {

      }
      );
  }

  getAll(){

    this.loading_data = true;
    this.transaksiService.getAll('waiting',0).subscribe(
      data => {
        this.listData = data;
        this.loading_data = false;
      },
      err => {

      }
    );
  }

}
