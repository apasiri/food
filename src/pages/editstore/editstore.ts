import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';
import { MystorePage } from '../mystore/mystore';

@IonicPage()
@Component({
  selector: 'page-editstore',
  templateUrl: 'editstore.html',
})
export class EditstorePage {

  user_id: any;

  store_id : any;
  store_name : string;
  store_address : string;
  store_Subarea : string;
  store_area : string;
  store_Province : string;
  store_contact : string;
  store_img : any;
  store_createdate : any;
  store_status : any;
  store_modifydate : any;

  public base64Image: string;
  imageData : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    public LoadingController: LoadingController,
    private camera: Camera,
    private alertCtrl: AlertController) {
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
    

    /////////////////// refresh profile ///////////////////
    let promise;
    promise = this.ServerCtrl.getStore(body)
    promise.then((data: any)=>
    {

      loader.dismiss();
      this.store_img = 'data:image/jpeg;base64,' +  data[0].img

      this.store_id = data[0].store_id
      this.store_name = data[0].store_name
      this.store_address = data[0].store_address
      this.store_contact = data[0].store_contact
      this.store_area = data[0].store_Area
      this.store_status = data[0].store_status
      this.store_Province = data[0].store_Province
      this.store_Subarea = data[0].store_Subarea
      this.store_modifydate = data[0].store_modifydate

    })
  }


  doEdit(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      store_name : this.store_name,
      store_address : this.store_address,
      store_Subarea : this.store_Subarea,
      store_area : this.store_area,
      store_Province : this.store_Province,
      store_contact : this.store_contact,
      store_status : this.store_status,
      user_id : this.user_id = localStorage.getItem('user_id'),//get ค่า user_id จาก localstorage
      store_img : this.imageData
    }
    
    let promise;
        promise = this.ServerCtrl.EditMystore(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              loader.dismiss();
              this.presentAlertsuc();
              this.navCtrl.setRoot(MystorePage);
            }else{
                loader.dismiss();
                this.presentAlertfail();             
            }
        },(error)=>{})
  }

  presentAlertsuc() {
    let alert = this.alertCtrl.create({
      subTitle: 'บันทึกข้อมูลสำเร็จ',
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
