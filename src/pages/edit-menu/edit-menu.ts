import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MystorePage } from '../mystore/mystore';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 


@IonicPage()
@Component({
  selector: 'page-edit-menu',
  templateUrl: 'edit-menu.html',
})
export class EditMenuPage {

  menu_id : any;
  menu_name : any;
  menu_amount : any;
  menu_price : any;
  menu_createdate : any;
  menu_img: any;
  menu_status : any;

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
    this.menu_id = this.navParams.get('item');

    
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    
    console.log()
    let body = {
      menu_id : this.menu_id
    }
    
    let promiseMenu;
    promiseMenu = this.ServerCtrl.getMenuforEdit(body)
    promiseMenu.then((data:any) => {
      this.menu_img = 'data:image/jpeg;base64,' +  data[0].menu_img

      this.menu_id = data[0].menu_id
      this.menu_name = data[0].menu_name
      this.menu_amount = data[0].menu_amount
      this.menu_price = data[0].menu_price
      this.menu_createdate = data[0].menu_createdate
      this.menu_status = data[0].menu_status


    },(error)=>{})

    loader.dismiss();
  }

  doEdit(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    this.menu_id = this.navParams.get('item');
    let body = {
      menu_id : this.menu_id,
      menu_name : this.menu_name,
      menu_amount : this.menu_amount,
      menu_price : this.menu_price,
      menu_createdate : this.menu_createdate,
      menu_img : this.imageData,
      menu_status : this.menu_status

    }
    console.log(this.menu_amount)
    
    let promise;
        promise = this.ServerCtrl.EditMenu(body)   
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
