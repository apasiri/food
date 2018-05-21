import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 
import { MybookingPage } from '../mybooking/mybooking'

@IonicPage()
@Component({
  selector: 'page-showlistbooking',
  templateUrl: 'showlistbooking.html',
})
export class ShowlistbookingPage {

  order_id : any;
  detailList : any;
  store_id : any;
  total : any;
  check : any;
  time : any;
  payment_img : any;
  payment_order_id : any;
  payment_total : any;
  confrim : any;

  public base64Image: string;
  imageData : any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public ServerCtrl: ServerconnectProvider,
     private alertCtrl: AlertController,
     public LoadingController: LoadingController,
     private camera: Camera) {
  }

  ionViewDidLoad() {
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
            if(data[0].order_payment_id != 0){
              let promiseconfrim;
              promiseconfrim = this.ServerCtrl.getPaymentconfirm(body)
              promiseconfrim.then((data:any) => {
                  if(data[0].payment_status == 0){
                    this.confrim = "**รอการยืนยันรายการสั่งอาหารจากร้านค้า"
                  }
                  else{
                    this.confrim = "**ได้รับการยืนยันรายการสั่งอาหารแล้ว"
                  }  
              },(error)=>{})
            }  

    },(error)=>{})

    loader.dismiss();
  }

  sendOrderpayment(_total,store_id){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    this.payment_order_id = this.navParams.get('item');
    this.payment_total = _total
    this.store_id = store_id
    console.log(this.payment_total)
    console.log(this.store_id)
    let body = {
      payment_order_id : this.payment_order_id,
      payment_img : this.imageData,
      payment_total : this.payment_total,
      store_id : this.store_id
    }
    let promise;
      promise = this.ServerCtrl.sendOrderpayment(body)   
      promise.then((data: any)=>{
          if(data[0]['Alert']==1){
            this.payment_order_id=""
            this.payment_img=""
            this.payment_total=""
            this.store_id=""
            loader.dismiss();
            this.Success();
            this.navCtrl.setRoot(MybookingPage);
          }else{
              loader.dismiss();
              this.fail();             
          }
      },(error)=>{})
  }

  Success() {
    let alert = this.alertCtrl.create({
      subTitle: 'ชำระเงินเพื่อจองสำเร็จ กรุณารอการยืนยันจากร้าน',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  fail() {
    let alert = this.alertCtrl.create({
      subTitle: 'ผิดพลาด',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }

   /////////// img ////////////////////
   takePicture() {
    let Option: CameraOptions = {
      destinationType: 0,
      sourceType: 1,
      targetHeight: 960,
      targetWidth: 960, //what widht you want after capaturing
     
    };
    this.camera.getPicture(Option).then((ImageData) => {
      this.imageData = ImageData;
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;
    }, (err) => {
      //Handle error
    });
  }


  browsePicture() {
    let Option: CameraOptions = {
      destinationType: 0,
      sourceType: 0,
      targetHeight: 960,
      targetWidth: 960, //what widht you want after capaturing
      
    };
    this.camera.getPicture(Option).then((ImageData) => {
      this.imageData = ImageData;
      this.base64Image = 'data:image/jpeg;base64,' + ImageData;

    }, (err) => {
      //Handle error
    });
  }

  removePicture() {
    this.imageData = undefined
    this.base64Image = undefined
  }

}
