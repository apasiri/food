import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';


import { ViewstorePage } from '../viewstore/viewstore';

@IonicPage()
@Component({
  selector: 'page-showstore',
  templateUrl: 'showstore.html',
})
export class ShowstorePage {

  selectItems : any;
  search : any;
  menuList : any;
  menu_img : any;

  menuSearch : any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public ServerCtrl: ServerconnectProvider,
     private alertCtrl: AlertController,
     public LoadingController: LoadingController,
     public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.getDataMenu();
  }

  getDataMenu(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();

    let body = {
      selectItems : this.selectItems,
      search : this.search,
    }

    let promise;
    promise = this.ServerCtrl.getDataMenu(body)
    promise.then((data:any) => {
      this.menuList = data;
      loader.dismiss(); 
    },(error)=>{})
  }

  SearchItems(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();

    let body = {
      selectItems : this.selectItems,
      search : this.search,
    }

    let promise;
    promise = this.ServerCtrl.SearchMenu(body)
    promise.then((data:any) => {
      this.menuSearch = data;
      loader.dismiss(); 
    },(error)=>{})
  }

  SelectMenu(_menuid){
    console.log(_menuid)
    this.navCtrl.push(ViewstorePage,{item:_menuid});
  }

}
