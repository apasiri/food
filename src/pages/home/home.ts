import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newsList : any;
  user_status : any;
  img : any;
  news_id : any;

  constructor(public navCtrl: NavController,
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

    let body = {
      user_status : this.user_status = localStorage.getItem('user_status')//get ค่า user_id จาก localstorage
    }

    let promise;
    promise = this.ServerCtrl.getNewsHomepage(body)
    promise.then((data:any) => {
      this.newsList = data;
      loader.dismiss();
    },(error)=>{})

    
  }

}
