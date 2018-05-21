import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';

import { ShowlistbookingPage } from '../showlistbooking/showlistbooking';

@IonicPage()
@Component({
  selector: 'page-mybooking',
  templateUrl: 'mybooking.html',
})
export class MybookingPage {

  user_id : any;
  bookingList : any;
  order_id : any;
  store_id : any;
  payment_id : any;
  book : any;
  order_idnew : any;
  mapstore_id : any;
  mapstore_la : any;
  mapstore_long : any;

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
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage
    }

    let promise;
    promise = this.ServerCtrl.getbookingList(body)
    promise.then((data:any) => {
      this.bookingList = data;
      var iarray = 0;
            for (var i = 0; i < data.length; i++){
                if(this.bookingList[iarray].order_payment_id == "0"){
                  this.bookingList[iarray].order_payment_id_new = "รอการชำระเงิน"
                  iarray++;
                }
                else{
                  this.bookingList[iarray].order_payment_id_new = "จ่ายแล้ว"
                  iarray++;
                }
            }
      
      loader.dismiss(); 
    },(error)=>{})
  }

  selectbook(_orderid,_storeid,_payid){
    this.order_id = _orderid
    this.mapstore_id = _storeid
    this.payment_id = _payid
    
    if(this.payment_id == 0){
      let actionSheet = this.actionSheetCtrl.create({
        title: 'กดเลือกเพื่อทำรายการ ',
        buttons: [
          {
            text: 'ดูรายละเอียดเพื่อชำระเงิน',
            role: 'Edit',
            handler: () => {
              this.navCtrl.push(ShowlistbookingPage,{item:_orderid});
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
    else{
      let actionSheet = this.actionSheetCtrl.create({
        title: 'กดเลือกเพื่อทำรายการ ',
        buttons: [
          {
            text: 'ดูรายละเอียด',
            role: 'Edit',
            handler: () => {
              this.navCtrl.push(ShowlistbookingPage,{item:_orderid});
            }
          },
          {
            text: 'MAPS **เริ่มต้นการนำทาง',
            role: 'Edit',
            handler: () => {
              //select location from store
              this.store_id
              console.log(this.store_id)
              let body = {
                mapstore_id : this.store_id
              }

              let promise;
              promise = this.ServerCtrl.getStore(body)
              promise.then((data: any)=>
              {
                //this.mapstore_la =
          
              })

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
  }
}
