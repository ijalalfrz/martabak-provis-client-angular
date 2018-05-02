import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MenuService } from '../services/menu.service';
import { TransaksiService } from '../services/transaksi.service';
import { AuthService } from '../services/auth.service';

import { MenuModel } from '../models/MenuModel';
import { MenuPrice } from '../models/MenuPriceModel';
import { DetailTransaksi } from '../models/DetailTransaksiModel';
import { Transaksi } from '../models/TransaksiModel'

import * as $ from "jquery";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() refreshBasket: EventEmitter<any> = new EventEmitter();


  MenuList:MenuModel[];
  SizeList:MenuPrice[];
  Medium:DetailTransaksi;
  Large:DetailTransaksi;
  UserTransaksi:Transaksi;

  loading:boolean;
  loading_size:boolean;
  disabled_nama:boolean;
  isDone:boolean = false;
  id_menubeli:number;
  grandTotal:number;
  loading_pesan:string = "PROSES";
  active:string;
  martabakPilih:string;
  errMsg:string ;

  constructor(private menuService: MenuService,
    private transaksiService: TransaksiService,
    private authService:AuthService,
    private router:Router) {

    this.Medium = new DetailTransaksi();
    this.Large = new DetailTransaksi();
    this.UserTransaksi = new Transaksi();
  }

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }



    this.disabled_nama = true;


    this.transaksiService.modalObserv.subscribe(data => {
      if(data){

        this.UserTransaksi = this.transaksiService.getTransaksi();
        this.grandTotal = this.transaksiService.countGrandTotal();
        if(this.transaksiService.countDetail()==0) this.disabled_nama = true;
        else this.disabled_nama = false;

      }
    });

    this.Medium.jumlah = 0;
    this.Large.jumlah = 0;
    this.loading = true;
    this.menuService.getMenus().subscribe(data =>{
      if(data){
        this.loading = false;
        this.MenuList = data;
      }
    });

  }


  prosesBeli(){
    if(!this.UserTransaksi.nama_pembeli){
      this.errMsg = "Nama harus diisi!"
    }else{
      let jml=0;
      this.UserTransaksi.ListDetail.map(x=>{
        jml+=x.jumlah;
      })
      this.UserTransaksi.jumlah_beli = jml;
      const obj = {
        transaksi : {
          total_harga: this.UserTransaksi.total_harga,
          nama_pembeli: this.UserTransaksi.nama_pembeli,
          jumlah_beli: this.UserTransaksi.jumlah_beli,
        },
        detail: this.UserTransaksi.ListDetail,
      }
      this.loading_pesan = "Loading...";
      this.transaksiService.insertTransaksi(obj).subscribe(
        data => {
          this.UserTransaksi = new Transaksi();
          this.transaksiService.reset();
          this.loading_pesan ="PROSES";
          this.isDone = true;
        },
        err => {
          this.loading_pesan ="PROSES";
          console.log(err);
          this.errMsg = "Gagal, terjadi kesalahan";
        }
      );
    }
  }

  getByCategory(num:number){
    this.loading = true;
    this.MenuList = [];
    if(num==1){
      this.active="manis";
      this.menuService.getMenusByCat("Manis").subscribe(data =>{
        if(data){
          this.loading = false;
          this.MenuList = data;
        }
      });

    }else{
      this.active="asin";
      this.menuService.getMenusByCat("Asin").subscribe(data =>{
        if(data){
          this.loading = false;
          this.MenuList = data;
        }
      });

    }
  }

  getSizeById(id:number){
    this.loading_size = true;
    this.id_menubeli = id;
    this.SizeList = null;
    this.menuService.getSizeById(id).subscribe(data =>{
      if(data){
        this.loading_size = false;
        this.SizeList = data;
        this.martabakPilih = this.SizeList[0].topping;
      }
    });
  }

  toPointPrice(char){
    let c = char.toString().substring(0,3);
    return c.slice(0, 2) + '.' + c.slice(2);

  }

  minOrder(list){
    if(list.size == "Medium"){
      this.Medium.id_menu = list.id_menu;
      this.Medium.id_size = list.id_size;
      this.Medium.harga_sekarang = list.harga;
      if(this.Medium.jumlah >0) this.Medium.jumlah -=1;
      this.Medium.total_harga = list.harga * this.Medium.jumlah;

    }else if(list.size == "Large"){

      this.Large.id_menu = list.id_menu;
      this.Large.id_size = list.id_size;
      this.Large.harga_sekarang = list.harga;
      if(this.Large.jumlah >0) this.Large.jumlah -=1;
      this.Large.total_harga = list.harga * this.Medium.jumlah;

    }
  }


  addOrder(list){
    if(list.size == "Medium"){
      this.Medium.id_menu = list.id_menu;
      this.Medium.id_size = list.id_size;
      this.Medium.harga_sekarang = list.harga;
      this.Medium.topping = list.topping;
      this.Medium.size = list.size;
      this.Medium.jumlah +=1;
      this.Medium.total_harga = list.harga * this.Medium.jumlah;
    }else if(list.size == "Large"){

      this.Large.id_menu = list.id_menu;
      this.Large.id_size = list.id_size;
      this.Large.topping = list.topping;
      this.Large.harga_sekarang = list.harga;
      this.Large.size = list.size;
      this.Large.jumlah +=1;
      this.Large.total_harga = list.harga * this.Medium.jumlah;

    }
  }

  removeItem(i){
    this.transaksiService.removeItem(i);
    this.UserTransaksi = this.transaksiService.getTransaksi();
  }
  resetDone(){
    this.isDone = false;
  }
  doAddDetail(){
    if(this.Medium.jumlah==0 && this.Large.jumlah ==0){

    }else{
      if(this.Medium && this.Medium.jumlah != 0){
        this.transaksiService.addDetail(this.Medium);
        this.Medium = new DetailTransaksi();
        this.Medium.jumlah = 0;
      }
      if(this.Large && this.Large.jumlah != 0){
        this.transaksiService.addDetail(this.Large);
        this.Large = new DetailTransaksi();
        this.Large.jumlah = 0;

      }
      $('#beli-modal').fadeOut();
    }



  }

}
