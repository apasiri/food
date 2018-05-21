import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MystorePage } from '../mystore/mystore';



import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 

@IonicPage()
@Component({
  selector: 'page-registerstore',
  templateUrl: 'registerstore.html',
})
export class RegisterstorePage {

  store_name : string;
  store_address : string;
  store_Subarea : string;
  store_area : string;
  store_Province : string;
  store_contact : string;
  user_id : any;
  store_img : any;
  store_createdate : any;

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
    console.log('ionViewDidLoad RegisterstorePage');
  }


  doRegisterstore(){
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
      user_id : this.user_id = localStorage.getItem('user_id'),//get ค่า user_id จาก localstorage
      store_img : this.imageData,
      store_createdate : this.store_createdate = new Date().toISOString()

    }
    
      let promise;
        promise = this.ServerCtrl.doRegisterstore(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.store_name=""
              this.store_address=""
              this.store_Subarea=""
              this.store_area=""
              this.store_contact=""
              this.imageData=""
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
      title: '',
      subTitle: 'สมัครสมาชิกสำเร็จ',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  presentAlertfail() {
    let alert = this.alertCtrl.create({
      title: 'ผิดพลาด',
      subTitle: 'Username นี้มีผู้ใช้งานแล้ว',
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
