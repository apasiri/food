import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 


@IonicPage()
@Component({
  selector: 'page-reportstore',
  templateUrl: 'reportstore.html',
})
export class ReportstorePage {

  user_id : any;
  reportList : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    public LoadingController: LoadingController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();

    let body = {
      user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage
    }

    let promise;
    promise = this.ServerCtrl.getDataReport(body)
    promise.then((data:any) => {
      this.reportList = data;
      loader.dismiss(); 
    },(error)=>{})
  }

}
