import { Injectable } from '@angular/core';

import { LocalStorageService } from 'ngx-webstorage';

import { HttpClient, HttpHeaders , HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Transaksi } from '../models/TransaksiModel'
import { DetailTransaksi } from '../models/DetailTransaksiModel'
import { TransaksiDetail } from '../models/TransaksiViewModel'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BASE_API } from '../global';


@Injectable()
export class TransaksiService {

  UserTrans:Transaksi;
  private total = new BehaviorSubject<number>(0);
  private modalList = new BehaviorSubject<boolean>(false);
  private refresh = new BehaviorSubject<boolean>(false);
  totalObserv = this.total.asObservable();
  modalObserv = this.modalList.asObservable();
  $refresh = this.refresh.asObservable();

  private httpOptions;


  constructor(private http: HttpClient,private storage:LocalStorageService) {
    let opt = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization' : '',
    }
    if(this.storage.isStorageAvailable()){
      let data = this.storage.retrieve('user_auth');
      if(data){
        opt.Authorization = `Bearer ${data.token}`;
      }
    }
    this.httpOptions = { headers: new HttpHeaders(opt) };

    this.UserTrans = new Transaksi();
    this.UserTrans.total_harga = 0;
  }

  insertTransaksi(data):Observable<any>{
    return this.http.post<any>(`${BASE_API()}/transaksi`, data, this.httpOptions)
      .pipe(
        tap(data =>{})
    );
  }

  updateStatus(id):Observable<any>{
    return this.http.post<any>(`${BASE_API()}/transaksi/status/${id}`,null,this.httpOptions)
      .pipe(
        tap(data =>{})
    );
  }

  getAll(status,limit):Observable<TransaksiDetail[]>{
    let uri;
    if(limit>0) uri = `${BASE_API()}/transaksi/status/${status}/${limit}`;
    else uri = `${BASE_API()}/transaksi/status/${status}`;

    return this.http.get<TransaksiDetail[]>(uri, this.httpOptions);
  }


  getTransaksi(){
    return this.UserTrans;
  }

  addDetail(data:DetailTransaksi){
    this.UserTrans.ListDetail.push(data);
    this.UserTrans.total_harga=this.countGrandTotal();

    this.total.next(this.countDetail());
  }

  removeItem(id:any){
    this.UserTrans.ListDetail = this.UserTrans.ListDetail.filter(x=>x.id_size != id);
    this.UserTrans.total_harga=this.countGrandTotal();
    this.modalList.next(true);

  }

  countDetail(){
    let total =0;
    this.UserTrans.ListDetail.forEach(x=>{
      total += x.jumlah;
    });
    return total;
  }

  countGrandTotal(){
    let grand = 0;
    this.UserTrans.ListDetail.forEach(x=>{
      let total = x.jumlah * x.harga_sekarang;
      grand+=total;
    });
    return grand;
  }

  openModal(){
    this.modalList.next(true);
  }

  closeModal(){
    this.modalList.next(false);
  }

  reset(){
    this.UserTrans = new Transaksi;
    this.total.next(0);
    this.modalList.next(false);
  }

  doRefresh(){
    this.refresh.next(true);
  }

  stopRefresh(){
    this.refresh.next(false);
  }
}
