import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'ngx-webstorage';

import { AuthService } from '../services/auth.service';
import { TransaksiService } from '../services/transaksi.service';

import { TransaksiDetail } from '../models/TransaksiViewModel'


import {LoaderComponent} from '../loader/loader.component'


@Component({
  selector: 'app-waitinglist',
  templateUrl: './waitinglist.component.html',
  styleUrls: ['./waitinglist.component.css']
})
export class WaitinglistComponent implements OnInit {
  listData:TransaksiDetail[];
  loading_data:boolean;


  constructor(private transaksiService:TransaksiService, private authService:AuthService, private storage:LocalStorageService, private router:Router) {
    this.getAll();
    this.transaksiService.$refresh.subscribe(x=>{
      if(x){
        console.log(x);
        this.getAll();
        this.transaksiService.stopRefresh();
      }
    });

    Observable.interval(5000).subscribe(x => {
      this.getAll();
    });

  }

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['admin/']);
    }
  }

  getAll(){
    this.loading_data = true;
    this.transaksiService.getAll('done',10).subscribe(
      data => {
        this.listData = data;
        this.loading_data = false;
      },
      err => {

      }
    );
  }

}
