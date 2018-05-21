import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 

import { ViewstorePage } from '../viewstore/viewstore';
import { MybookingPage } from '../mybooking/mybooking';


@IonicPage()
@Component({
  selector: 'page-viewstoremenu',
  templateUrl: 'viewstoremenu.html',
})
export class ViewstoremenuPage {

  orderdata : any;
  user_id : any;
  detail  : any;
  store_id : any;
  user_store_id : any;
  order_date : any;
  totalprice :  any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    public LoadingController: LoadingController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('item'))
    if(this.navParams.get('item') != undefined){
      this.orderdata = this.navParams.get('item');
    }
    
  }

  //ลบ array ตำแหน่งที่เลือก
  removeOrder(i){
    console.log(i);
    console.log(this.orderdata.length)
    //splice 0 เพิ่ม 1 ลบ
    this.orderdata.splice(i, 1);
    //console.log(this.orderdata)
  }

  sendOrder(sendOrder){
    console.log(sendOrder);
    if(this.orderdata == ""){
      this.present();
    }
    else{
      let loader = this.LoadingController.create({
        content: 'กำลังโหลด',spinner: 'crescent'
      })
      loader.present();
      this.detail = sendOrder
      let body = {
        // รายละเอียดรายการสั่งซื้อ
        detail : this.detail,//id ร้าน
        store_id : this.detail[0].store_id,// id store ของผู้ซื้อ
        user_store_id : this.user_store_id = localStorage.getItem('user_store_id'),// id ของผู้ซื้อ
        user_id : this.user_id = localStorage.getItem('user_id'),//get ค่า user_id จาก localstorage
        order_date : this.order_date = new Date().toISOString()
      }
      
      let promise;
          promise = this.ServerCtrl.sendOrder(body)   
          promise.then((data: any)=>{
              if(data[0]['Alert']==1){
                this.detail=""
                this.user_id=""
                loader.dismiss();
                this.presentAlertsuc();
                this.navCtrl.setRoot(MybookingPage);
              }else{
                  loader.dismiss();
                  this.presentAlertfail();             
              }
          },(error)=>{})
    }

  }

  presentAlertsuc() {
    let alert = this.alertCtrl.create({
      subTitle: 'ทำรายการสำเร็จ กรุณาทำรายการชำระเงินเพื่อยืนยันการจอง',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  presentAlertfail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
       
  present() {
    let alert = this.alertCtrl.create({
      subTitle: 'กรุณาเพิ่มรายการอาหารก่อนทำรายการสั่งจอง',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

}


