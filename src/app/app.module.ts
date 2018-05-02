import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }  from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './services/menu.service';
import { LoaderComponent } from './loader/loader.component';
import { TransaksiService } from './services/transaksi.service';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './admin/admin.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WaitinglistComponent } from './waitinglist/waitinglist.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2Webstorage
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoaderComponent,
    AdminComponent,
    DashboardComponent,
    WaitinglistComponent
  ],
  providers: [MenuService, TransaksiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
