import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';
import { MystorePage } from '../mystore/mystore';


@IonicPage()
@Component({
  selector: 'page-sendlease',
  templateUrl: 'sendlease.html',
})
export class SendleasePage {
  
  user_id : any;
  payList : any;
  pay_detail : any;

  lease_addtime : any;
  lease_img : any;

  public base64Image: string;
  imageData : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public ServerCtrl: ServerconnectProvider,
    private alertCtrl: AlertController,
    public LoadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    
    console.log()
    let body = {
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage
    }
    
    let promisePay;
    promisePay = this.ServerCtrl.getPayAdmin(body)
    promisePay.then((data:any) => {
      this.payList = data;
    },(error)=>{})

    loader.dismiss();
  }

  //ขอเพิ่มระยะเวลาเช่าร้าน
  doLease(){

      let loader = this.LoadingController.create({
        content: 'กำลังโหลด',spinner: 'crescent'
      })
      loader.present();
      
      console.log()
      let body = {
        lease_addtime : this.lease_addtime,
        lease_img : this.imageData,
        user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage
      }
      let promise;
        promise = this.ServerCtrl.addLease(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.lease_addtime=""
              this.user_id=""
              loader.dismiss();
              this.LeaseSuccess();
              this.navCtrl.setRoot(MystorePage);
            }else{
                loader.dismiss();
                this.Leasefail();             
            }
        },(error)=>{})

  }

  LeaseSuccess() {
    let alert = this.alertCtrl.create({
      subTitle: 'ส่งคำร้องสำเร็จ ระบบจะทำการตรวจสอบหลักฐานเพื่อเพิ่มระยะเวลาภายใน 24 ชั่วโมง',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  Leasefail() {
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
