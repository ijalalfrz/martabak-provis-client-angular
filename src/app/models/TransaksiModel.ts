import { DetailTransaksi } from './DetailTransaksiModel';

export class Transaksi {



  nama_pembeli:string;
  id_toko:number;
  jumlah_beli:number;
  total_harga:number;
  ListDetail:DetailTransaksi[];

  constructor(){
    this.ListDetail = new Array<DetailTransaksi>();
  }

}
