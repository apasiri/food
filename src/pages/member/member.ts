import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController , ActionSheetController} from 'ionic-angular';
import { ServerconnectProvider } from '../../providers/serverconnect/serverconnect';

import { EditMemberPage } from '../../pages/edit-member/edit-member';

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  user_status : any;
  memberList : any;
  user_id: any;
  selectItems : any;
  search : any;
  membercount :  any;
  memberSearch: any;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ServerCtrl: ServerconnectProvider,
    private alertCtrl: AlertController,
    public LoadingController: LoadingController,
    public actionSheetCtrl: ActionSheetController){
  }

  

  ionViewDidLoad() {
    this.getDataMember();
  }

  getDataMember(){
    let loader = this.LoadingController.create({
      content: 'กำลังโหลด',spinner: 'crescent'
    })
    loader.present();

    let body = {
      selectItems : this.selectItems,
      search : this.search,
      user_status : this.user_status = localStorage.getItem('user_status')//get ค่า user_id จาก localstorage
    }

    let promise;
    promise = this.ServerCtrl.getMember(body)
    promise.then((data:any) => {
      this.memberList = data;
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
      user_status : this.user_status = localStorage.getItem('user_status')//get ค่า user_id จาก localstorage
    }

    let promise;
    promise = this.ServerCtrl.SearchItems(body)
    promise.then((data:any) => {
      this.memberSearch = data;
      loader.dismiss(); 
    },(error)=>{})
  }

 
  changMember(_Itemuser){

    let confirmDelectMember = this.alertCtrl.create({
        title: '',
        message: 'โปรดกดยืนยันหากต้องการลบสมาชิก',
        buttons: [
          {
            text: 'ยกเลิก',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'ยืนยัน',
            handler: () => {
              let loader = this.LoadingController.create({
                content: 'กำลังโหลด',spinner: 'crescent'
              })
              loader.present();
              this.user_id = _Itemuser
              let body = {
                user_id : this.user_id
              }
              
              let promise;
                  promise = this.ServerCtrl.DeleteMember(body)   
                  promise.then((data: any)=>{
                      if(data[0]['Alert']==1){
                        loader.dismiss();
                        this.DeleteMemberItem();
                        this.navCtrl.setRoot(MemberPage);
                      }else{
                          loader.dismiss();
                          this.DeleteMemberfail();             
                      }
                  },(error)=>{

                  })
            }
          }
        ]
      });
      
    console.log(_Itemuser);
    let actionSheet = this.actionSheetCtrl.create({
        title: 'กดเลือกพื่อทำรายการ ',
        buttons: [
          {
            text: 'ลบข้อมูลสมาชิก',
            role: 'Delete',
            handler: () => {
              confirmDelectMember.present();
            }
          },
          {
            text: 'เรียกดูข้อมูลสมาชิก',
            role: 'Edit',
            handler: () => {
              this.navCtrl.push(EditMemberPage,{item:_Itemuser});
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
  
    actionSheet.present();

  }

    doEditMember(){
      
    } 

    DeleteMemberItem() {
      let alert = this.alertCtrl.create({
        subTitle: 'ลบรายการข่าวสารสำเร็จ',
        buttons: ['ยืนยัน']
      });
      alert.present();
    }
    DeleteMemberfail() {
      let alert = this.alertCtrl.create({
        subTitle: 'ผิดพลาด',
        buttons: ['ยืนยัน']
      });
      alert.present();
    }


}
