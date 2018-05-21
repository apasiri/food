import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 
import { AccountPage } from '../../pages/account/account';

@IonicPage()
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditaccountPage {

  body: any;
  user: any;
  user_name: any;
  user_phone: any;
  user_Email: any;
  user_personalID: any;
  user_sex: any;
  img: string;
  memberid: any;
  user_id: any;
  user_img : any;

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

    let user;
    user = JSON.parse(localStorage.getItem('UserPass'));


    /////////////////// refresh profile ///////////////////
    let promise;
    promise = this.ServerCtrl.goLogin(user.body)
    promise.then((data: any)=>
    {

      localStorage.setItem('UserLogin',JSON.stringify({
        DataStorage: data[0]
      }));

      localStorage.setItem('user_id',JSON.stringify(
        data[0].user_id
      ));
      loader.dismiss();
      
      this.body = JSON.parse(localStorage.getItem('UserLogin'));
      
    
      this.img = 'data:image/jpeg;base64,' +  this.body.DataStorage.user_img
      this.body = JSON.parse(localStorage.getItem('UserLogin'));

      this.user_name = this.body.DataStorage.user_name
      this.user_Email = this.body.DataStorage.user_email
      this.user_sex = this.body.DataStorage.user_sex
      this.user_phone = this.body.DataStorage.user_phonenumber
      this.user_personalID = this.body.DataStorage.user_personalID
      this.memberid = this.body.DataStorage.user_id
    })
  }

  doEdit(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      user_name : this.user_name,
      user_Email : this.user_Email,
      user_sex : this.user_sex,
      user_phone : this.user_phone,
      user_personalID :this.user_personalID,
      user_img : this.imageData,
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage

    }
    
    let promise;
        promise = this.ServerCtrl.EditAccount(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              loader.dismiss();
              this.presentAlertsuc();
              this.navCtrl.setRoot(AccountPage);
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
