
export class TransaksiView {

  nama_pembeli:string;
  id_toko:number;
  nama_toko:number;
  jumlah_beli:number;
  total_harga:number;
  status:string;
}


export class DetailTransaksiView {

  id_menu: number;
  id_size: number;
  size: string;
  topping: string;
  jumlah: number;
  harga_sekarang:number;
  total_harga:number;
}

export class TransaksiDetail {
  transaksi:TransaksiView;
  detail:DetailTransaksiView[];
  constructor(){
    this.detail = new Array<DetailTransaksiView>();
  }

}
