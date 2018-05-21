import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';

import { ShowbooklistPage } from '../showbooklist/showbooklist'

@IonicPage()
@Component({
  selector: 'page-booklist',
  templateUrl: 'booklist.html',
})
export class BooklistPage {

  user_id : any;
  bookingList : any;
  store_id : any;
  order_id : any;
  payment_id : any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public ServerCtrl: ServerconnectProvider,
     private alertCtrl: AlertController,
     public LoadingController: LoadingController,
     public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();

    let body = {
      store_id : this.store_id = localStorage.getItem('user_store_id')//get ค่า user_id จาก localstorage
    }

    let promise;
    promise = this.ServerCtrl.getbookingListOrder(body)
    promise.then((data:any) => {
      this.bookingList = data;
      var iarray = 0;
            for (var i = 0; i < data.length; i++){
                if(this.bookingList[iarray].payment_status == "0"){
                  this.bookingList[iarray].order_payment_id_new = "รอการยืนยัน"
                  iarray++;
                }
                else{
                  this.bookingList[iarray].order_payment_id_new = "ยืนยันการจองเสร็จสิ้น"
                  iarray++;
              }
            }
      
      loader.dismiss(); 
    },(error)=>{})
  }

  selectbook(_orderid,_payid){
    this.order_id = _orderid
    this.payment_id = _payid

      let actionSheet = this.actionSheetCtrl.create({
        title: 'กดเลือกเพื่อทำรายการ ',
        buttons: [
          {
            text: 'ดูรายละเอียดการชำระเงิน',
            role: 'Edit',
            handler: () => {
              this.navCtrl.push(ShowbooklistPage,{item:_orderid});
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
  }

  DeleteItem() {
    let alert = this.alertCtrl.create({
      subTitle: 'ลบประวัติสั่งจองสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  DeleteItemfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
}
