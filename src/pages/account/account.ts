import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 
import { EditaccountPage } from '../../pages/editaccount/editaccount';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    public LoadingController: LoadingController) {
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

  goEdit(){

    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    this.navCtrl.setRoot(EditaccountPage);
    loader.dismiss(); 
  }

}
