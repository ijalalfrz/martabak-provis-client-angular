import { Injectable } from '@angular/core';
import { Transaksi } from '../models/TransaksiModel'
import { DetailTransaksi } from '../models/DetailTransaksiModel'
@Injectable()
export class TransaksiService {

  UserTrans:Transaksi;


  constructor() {
    this.UserTrans = new Transaksi();
  }

  getTransaksi(){
    return this.UserTrans;
  }

  addDetail(data:DetailTransaksi){
    this.UserTrans.ListDetail.push(data);
  }


}
