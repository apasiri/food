import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';



import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user_username : string;
  user_password : string;
  user_passwordcheck : string;
  user_name : string;
  user_sex : string;
  user_email : string;
  user_phonenumber : string;
  user_personalid : any;
  user_status: any;


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
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();

    let body = {

      user_username : this.user_username,
      user_password : this.user_password,
      user_passwordcheck : this.user_passwordcheck,
      user_name : this.user_name,
      user_sex : this.user_sex,
      user_email : this.user_email,
      user_phonenumber : this.user_phonenumber,
      user_personalid : this.user_personalid,
      user_imgcard : this.imageData,
      user_status : this.user_status = 1
    }
    

    if(this.user_password != this.user_passwordcheck){
      let alert = this.alertCtrl.create({
        title: 'ผิดพลาด',
        subTitle: 'password ไม่ตรงกัน',
        buttons: ['ยืนยัน']
      });loader.dismiss();
      alert.present();
    }
    else{
      let promise;
        promise = this.ServerCtrl.doRegister(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.user_username=""
              this.user_password=""
              this.user_passwordcheck=""
              this.user_name=""
              this.user_sex=""
              this.user_email=""
              this.user_phonenumber=""
              this.user_personalid=""
              this.user_status
              this.imageData=""
              loader.dismiss();
              this.presentAlertsuc();
              this.navCtrl.setRoot(LoginPage);
            }else{
              if(data[0]['Alert'] == 0){
                loader.dismiss();
                this.presentAlertfail();
              }
              else{
                loader.dismiss();
                this.presentAlertPersonalcard();
              }
              
            }
        },(error)=>{})   
      }

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

  presentAlertPersonalcard(){
    let alert = this.alertCtrl.create({
      title: 'ผิดพลาด',
      subTitle: 'กรุณาใส่รูปบัตรประชาชนเพื่อความปลอดภัยในการใช้งาน',
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
