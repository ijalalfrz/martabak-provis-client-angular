import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }  from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './services/menu.service';
import { LoaderComponent } from './loader/loader.component';
import { TransaksiService } from './services/transaksi.service';


@NgModule({
   imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoaderComponent
  ],
  providers: [MenuService, TransaksiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
