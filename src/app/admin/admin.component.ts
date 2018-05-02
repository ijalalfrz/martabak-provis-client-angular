import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { AuthService } from '../services/auth.service';
import { TransaksiService } from '../services/transaksi.service';

import {LoaderComponent} from '../loader/loader.component'

import { User } from '../models/UserModel';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user:User;
  errMsg:string;
  loading:boolean;

  constructor(private transaksiService:TransaksiService, private authService:AuthService, private storage:LocalStorageService, private router:Router) {
    this.user = new User();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['admin/dashboard']);
    }
  }

  login(f:NgForm){
    this.loading = true;
    this.authService.getToken(f.value).subscribe(
      data=>{
        if(data){
          this.user = data;
          this.storage.store('user_auth', data);
          this.router.navigate(['admin/dashboard']);
          this.authService.login();
        }
        this.loading = false;
      },
      error=>{
        console.log(error);
        if(error){

          this.errMsg = error.error.message;
        }else{
          this.errMsg = "Username/password anda salah!";

        }
        this.loading = false;
      }
    )
  }
}
