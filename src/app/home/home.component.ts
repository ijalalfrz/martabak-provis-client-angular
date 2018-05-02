import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
  }
  goToMenu(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/menu'])
    }else{
       $('#warn-modal').css("display", "flex")
      .hide()
      .fadeIn();
    }
  }
}
