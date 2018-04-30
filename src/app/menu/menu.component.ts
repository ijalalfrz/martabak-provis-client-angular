import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MenuService } from '../services/menu.service';
import { TransaksiService } from '../services/transaksi.service';

import { MenuModel } from '../models/MenuModel';
import { MenuPrice } from '../models/MenuPriceModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  MenuList:MenuModel[];
  SizeList:MenuPrice[];
  loading:boolean;
  active:string;

  constructor(private menuService: MenuService, private transaksiService: TransaksiService) { }

  ngOnInit() {
    console.log(this.transaksiService.getTransaksi());
    this.loading = true;
    this.menuService.getMenus().subscribe(data =>{
      if(data){
        this.loading = false;
        this.MenuList = data;
      }
    });

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
    this.menuService.getSizeById(id).subscribe(data =>{
      if(data){
        this.SizeList = data;
      }
    });
  }

  toPointPrice(char){
    let c = char.toString().substring(0,3);
    return c.slice(0, 2) + '.' + c.slice(2);

  }

}
