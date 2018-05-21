import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';

import { BooklistPage } from '../booklist/booklist'

@IonicPage()
@Component({
  selector: 'page-showbooklist',
  templateUrl: 'showbooklist.html',
})
export class ShowbooklistPage {

  order_id : any;
  detailList : any;
  store_id : any;
  total : any;
  check : any;
  time : any;
  payment_img : any;
  payment_order_id : any;
  payment_total : any;
  img : any;
  payment_status : any;
  payment_id : any;

  public base64Image: string;
  imageData : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    private alertCtrl: AlertController,
    public LoadingController: LoadingController,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('item'))
    this.order_id = this.navParams.get('item');

    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();

    let body = {
      order_id : this.order_id
    }
    
    let promiseMenu;
    promiseMenu = this.ServerCtrl.getbookingListforpayment(body)
    promiseMenu.then((data:any) => {
      this.detailList = data;
      this.time = data[0].order_datetime
      this.store_id = data[0].order_store_id
      var iarray = 0;
      this.total = 0;
            for (var i = 0; i < data.length; i++){
              if(this.detailList[iarray].order_payment_id == "0"){
                this.check = 1
                this.total += this.detailList[iarray].detail_totalcost
                iarray++;
              }
              else{
                this.total += this.detailList[iarray].detail_totalcost
                iarray++;
              }
            }
    },(error)=>{})

    //get payment
    let promisePay;
    promisePay = this.ServerCtrl.getPaymentOrder(body)
    promisePay.then((data:any) => {
      this.img = 'data:image/jpeg;base64,' + data[0].payment_img
      this.payment_status = data[0].payment_status
      this.payment_id = data[0].payment_id
    },(error)=>{})

    loader.dismiss();
  }

  confirm(payment_id){

    console.log(payment_id)
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    this.payment_id = payment_id
    let body = {
      payment_id : this.payment_id
    }
    
    let promise;
        promise = this.ServerCtrl.confirm(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              loader.dismiss();
              this.Item();
              this.navCtrl.setRoot(BooklistPage);
            }else{
              loader.dismiss();
              this.Itemfail();             
            }
        },(error)=>{

        })

  }

  Item() {
    let alert = this.alertCtrl.create({
      subTitle: 'ยืนการจองสำเสร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  Itemfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

  

}
