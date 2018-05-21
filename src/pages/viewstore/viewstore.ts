import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Platform } from 'ionic-angular';

import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect'; 
import { ViewstoremenuPage } from '../viewstoremenu/viewstoremenu';
import { MapPage } from '../map/map';


@IonicPage()
@Component({
  selector: 'page-viewstore',
  templateUrl: 'viewstore.html',
})
export class ViewstorePage {

  user_id: any;

  store_id : any;
  store_name : string;
  store_address : string;
  store_Subarea : string;
  store_area : string;
  store_Province : string;
  store_contact : string;
  store_img : any;
  store_createdate : any;
  store_status : any;
  store_user_id : any;

  store_longitude : any;
  store_latitude : any;
  _longitude : any;
  _latitude : any;

  newstore_id : any;
  PayChannel_detail : any;
  Payid_delect : any;

  menuList : any;
  PayChannelList : any;
  newsList : any;
  user_status : any;
  menu_store_id : any;
  store_IsActive : any;

  menu_id : any;
  menu_name : any;
  menu_img : any;
  menu_price : any;
  menu_amount : any;
  destination:string;
  start:string;

  comment_text : any;
  comment_store_id : any;
  comment_user_id : any;
  commentList : any;
  NewStoreid : any;

  menuid_test =[];
  amountmenu : any;
  amountnumber = [];
  showcart : any;
  

  booking_menuid : any;
  booking_amount : any;

  public base64Image: string;
  imageData : any;

    latitude:number ;
  	longitude:number ;

   addMenuBooking=[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    public LoadingController: LoadingController,
    private camera: Camera,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private geolocation: Geolocation, 
    private launchNavigator:LaunchNavigator,
    public platform:Platform) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then(position =>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude,this.longitude)
    },error=>{
        console.log('error',error);
    });
    this.menu_id = this.navParams.get('item');
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
    console.log(this.menu_id)
    let body = {
      menu_id : this.menu_id
    }
    
    //เลือกร้านจาก id menu 
    let promise;
    promise = this.ServerCtrl.getStoreOfmenu(body)
    promise.then((data: any)=>
    {
      this.store_img = 'data:image/jpeg;base64,' +  data[0].store_img

      this.store_id = data[0].store_id
      this.store_name = data[0].store_name
      this.store_address = data[0].store_address
      this.store_contact = data[0].store_contact
      this.store_area = data[0].store_Area
      this.store_Province = data[0].store_Province
      this.store_Subarea = data[0].store_Subarea

      if(data[0].store_status == "0"){
        this.store_status = "เปิดร้านปกติ"
      }
      else{
        this.store_status = "ปิดร้าน"
      }
      this.store_latitude = data[0].store_latitude
      this.store_longitude = data[0].store_longitude

      this.menu_id = data[0].menu_id
      this.menu_name = data[0].menu_name
      this.menu_img = 'data:image/jpeg;base64,' + data[0].menu_img
      this.menu_price = data[0].menu_price
      this.menu_amount = data[0].menu_amount
      this.store_user_id =  data[0].store_user_id
      if(data[0].store_IsActive == 1){
        this.store_IsActive = "โปรดระวัง!!! ร้านนี้ได้ถูกระงับการใช้งานเนื่องจากมีการกระทำความผิด"
      }
      else{

      }
      
      let bodyNew = {
        user_id : this.store_user_id,
        NewStoreid : this.store_id
      }
      console.log(this.store_user_id)
  
      //get payment
      let promisePay;
      promisePay = this.ServerCtrl.getPaymentCh(bodyNew)
      promisePay.then((data:any) => {
        this.PayChannelList = data;
      },(error)=>{})
  
      //get menu
      let promiseMenu;
      promiseMenu = this.ServerCtrl.getMenu(bodyNew)
      promiseMenu.then((data:any) => {
        this.menuList = data;
          var iarray = 0;
          // ไม่เอา Menu_id ที่ซ้ำกันมาแสดง
            for (var i = 0; i < data.length; i++){
              if(this.menuList[iarray].menu_id == this.menu_id){
                this.menuList.splice(iarray, 1);
                iarray++;
              }
              else{
                iarray++;
              }
            }
      
      },(error)=>{})
      //get comment
      let promiseComment;
      promiseMenu = this.ServerCtrl.getComment(bodyNew)
      promiseMenu.then((data:any) => {
        this.commentList = data;
      },(error)=>{})
    })
    
    loader.dismiss();
  }



  
  //สั่งอาหาร
  bookingfood(menu_id,menu_amount,menu_price,menu_name,store_id){
    let prompt = this.alertCtrl.create({
      title: 'เพิ่มรายการอาหารลงตะกร้า',
      message: "กรอกจำนวนอาหารที่ต้องการสั่งจอง",
      inputs: [
        {
          name: 'amount',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(data.amount !=""){
              if(data.amount > menu_amount){
                this.presentAlert();
              }
              else{
                //this.addMenuBooking.push(menu_id);
                this.amountnumber = data.amount
                this.menuid_test.push({amount:this.amountnumber,menuid:menu_id,menuname:menu_name,menuprice:menu_price,store_id:store_id});
                console.log(this.amountnumber);
              }
            }
            else{
              this.presentfailorder();
            }
          }
        }
      ]
    });
    prompt.present();
    //console.log('a=',this.addMenuBooking);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'จำนวนที่ต้องการเกินจำนวนขายคงเหลือ กรุณาทำรายการใหม่',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }
  presentfailorder(){
    let alert = this.alertCtrl.create({
      subTitle: 'ไม่ได้ระบุบจำนวน กรุณาเพิ่มรายการลงตะกร้าอีกครั้ง',
      buttons: ['ยืนยัน']
    });
    alert.present();
  }


doneOrder(){
  //id-menu และ จำนวนที่ต้องการ

    this.menuid_test
    console.log(this.menuid_test);
    this.navCtrl.push(ViewstoremenuPage,{item:this.menuid_test});
}
  

  //นำทาง
  navigate(_latitude,_longitude){
    
        this.store_latitude = parseFloat(_latitude)
        this.store_longitude = parseFloat(_longitude)
        console.log(this.store_latitude,this.store_longitude)
        // this.destination = this.store_latitude + ' ' + this.store_longitude 
        //console.log(this.destination)
        this.navCtrl.push(MapPage,{_latitude:this.store_latitude,_longitude:this.store_longitude});
        
        // let options: LaunchNavigatorOptions = {
        //   start:[this.latitude,this.longitude],
        //   //app: this.launchNavigator.APP.GOOGLE_MAPS
        // };
        // this.launchNavigator.navigate([this.store_latitude,this.store_longitude], options)
        // .then(
        //   success => alert('Launched navigator'),
        //   error => alert('Error launching navigator: ' + error))

        //this.launchNavigator.navigate(this.destination);
         //เก็บค่า Location ปัจจุบัน
        
  }

  doneComment(storeid){

    this.comment_store_id = storeid
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();
   
    let body = {
      comment_text : this.comment_text,
      comment_store_id : this.comment_store_id, 
      comment_user_id : this.user_id = localStorage.getItem('user_id')//get ค่า user_id จาก localstorage
    }
    
    let promise;
        promise = this.ServerCtrl.doneComment(body)   
        promise.then((data: any)=>{
            if(data[0]['Alert']==1){
              this.comment_text=""
              this.comment_store_id=""
              this.comment_user_id=""             
              loader.dismiss();
              this.presentAlertsuc();
            }else{
                loader.dismiss();
                this.presentAlertfail();             
            }
        },(error)=>{})

  }

  presentAlertsuc() {
    let alert = this.alertCtrl.create({
      subTitle: 'ขอบคุณสำหรับความคิดเห็น',
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



}
