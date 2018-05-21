import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username : any;
  password : any;
  statuslogin: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl:ServerconnectProvider,
    public LoadingController: LoadingController,
    public AlertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goLogin(){

    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })

    let alert = this.AlertController.create({
      subTitle: 'ข้อมูล username หรือ password ผิดพลาด',
      buttons: ['OK']
    });
    loader.present();
    
    let body = {
      username: this.username,
      password: this.password,
    }
    localStorage.setItem('UserPass',JSON.stringify({
      body
    }));
    console.log(body);
    let promise;

    promise = this.ServerCtrl.goLogin(body)
    promise.then((data: any)=>{
      // ข้อมูล id_user ที่ได้จากการ Login เก็บไว้ที่ LocalStorage ชื่อ id_user
      /*localStorage.setItem('Login',JSON.stringify({
        dataStorage: data
      }));*/
      localStorage.setItem('UserLogin',JSON.stringify({
        DataStorage: data[0]
      }));
      
      localStorage.setItem('user_id',JSON.stringify(
        data[0].user_id
      ));
      localStorage.setItem('user_store_id',JSON.stringify(
        data[0].user_store_id
      ));

      localStorage.setItem('user_status',JSON.stringify(
        data[0].user_status
      ));
      
      //เก็บ statuslogin ไว้เพื่อตรวจสอบข้อมูลสมาชิก 1 มี 0 ไม่
      this.statuslogin = JSON.parse(localStorage.getItem('UserLogin'));
      localStorage.setItem('Statuslogin',JSON.stringify(
        this.statuslogin.DataStorage.status
      ));
      
      if(data[0].status == '1'){
        setTimeout(function(){
          loader.dismiss();
          window.location.reload(true);
         },2000);
      }
      else{
          alert.present();
          loader.dismiss();
      }
    },(error)=>{ })
      
    }


  
}
