import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MystorePage } from '../mystore/mystore';


import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 

@IonicPage()
@Component({
  selector: 'page-addmenu',
  templateUrl: 'addmenu.html',
})
export class AddmenuPage {

  store_id : any;
  menu_name : any;
  menu_amount : any;
  menu_price : any;
  menu_createdate : any;

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
    console.log('ionViewDidLoad AddmenuPage');
  }

  doAddMenu(){
    this.store_id = this.navParams.get('item');
    console.log(this.store_id)

    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      store_id : this.store_id,
      menu_name : this.menu_name,
      menu_amount : this.menu_amount,
      menu_price : this.menu_price,
      menu_createdate : this.menu_createdate,
      menu_img : this.imageData
    }
    
    let promise;
        promise = this.ServerCtrl.AddMenu(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.menu_name=""
              this.menu_amount=""
              this.menu_price=""             
              this.imageData=""
              this.store_id=""
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
      subTitle: 'เพิ่มรายการอาหารสำเร็จ',
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
