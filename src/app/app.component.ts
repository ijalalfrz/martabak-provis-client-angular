import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TransaksiService } from './services/transaksi.service';
import { AuthService } from './services/auth.service';

import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  numPesanan:number;
  url:string;
  url_admin:string;
  isLogged:boolean;

  constructor(private router:Router ,private transService:TransaksiService, private authService:AuthService, private storage:LocalStorageService){
   transService.totalObserv.subscribe((x) => this.numPesanan = x );
   this.url = this.router.url.split('/')[1];
   this.authService.$isLogin.subscribe(x=>{
     this.isLogged = x;
   });
  }

  ngOnInit(){
   this.isLogged = this.authService.isAuthenticated();
   this.router.events.subscribe(res=>{
    this.url = this.router.url.split('/')[1];
   })
   this.url_admin = window.location.pathname.split('/')[1];
  }

  logout(){
    if(this.storage.isStorageAvailable()){
      this.storage.clear('user_auth');
      this.authService.logout();
      this.router.navigate(['/admin']);
    }
  }


  onClickOpenModal(){
    this.transService.openModal();
  }
}
