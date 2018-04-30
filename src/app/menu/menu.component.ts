import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MenuService } from '../services/menu.service';
import { MenuModel } from '../models/MenuModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  MenuList:MenuModel[];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe(data => this.MenuList = data);

  }


  toPointPrice(char){
    let c = char.toString().substring(0,3);
    return c.slice(0, 2) + '.' + c.slice(2);

  }

}
