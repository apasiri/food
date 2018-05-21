import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { RequestOptions,Headers } from '@angular/http'

/*
  Generated class for the ServerconnectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerconnectProvider {
  
  url:string='http://localhost:4000'

  constructor(public http: Http) {
    console.log('Hello ServerconnectProvider Provider');
  }

  
  goLogin(body){
    console.log(body)
     return new Promise((resolve, reject) => {
       this.http.post(this.url+'/Login',body)
       .map(res => res.json())
       .subscribe(data => {
         resolve(data)
       }, err => {
         reject(err)
       });
       });
  }

  doRegister(body){
    console.log(body)
     return new Promise((resolve, reject) => {
       this.http.post(this.url+'/Register',body)
       .map(res => res.json())
       .subscribe(data => {
         resolve(data)
       }, err => {
         reject(err)
       });
       });
  }

  UpdateNews(body){
    console.log(body)
     return new Promise((resolve, reject) => {
       this.http.post(this.url+'/UpdateNews',body)
       .map(res => res.json())
       .subscribe(data => {
         resolve(data)
       }, err => {
         reject(err)
       });
       });
  }

  getNews(body){
     return new Promise((resolve, reject) => {
       this.http.post(this.url+'/getNews',body)
       .map(res => res.json())
       .subscribe(data => {
         resolve(data)
       }, err => {
         reject(err)
       });
       });
  }

  getMember(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getMember',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  getMemberaccount(body){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'/getMemberaccount',body)
    .map(res => res.json())
    .subscribe(data => {
      resolve(data)
    }, err => {
      reject(err)
    });
    });
  }

  getStore(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getStore',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  SearchItems(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/SearchItems',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
    }

    getNewsHomepage(body){
      return new Promise((resolve, reject) => {
        this.http.post(this.url+'/getNewsHomepage',body)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
        });
  }

  DeleteNews(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/DeleteNews',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  DeletePayCh(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/DeletePayCh',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  DeleteMember(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/DeleteMember',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  EditAccount(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/EditAccount',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  EditMystore(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/EditMystore',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  EditAccountFormAdmin(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/EditAccountFormAdmin',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  goStore(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/goStore',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  doRegisterstore(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/doRegisterstore',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  addPayment(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/addPayment',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  getPaymentCh(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getPaymentCh',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  AddMenu(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/AddMenu',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  getMenu(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getMenu',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  DeleteMenu(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/DeleteMenu',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  getMenuforEdit(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getMenuforEdit',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  EditMenu(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/EditMenu',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  updateLocation(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/updateLocation',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getDataMenu(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getDataMenu',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  SearchMenu(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/SearchMenu',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getPayAdmin(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getPayAdmin',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  AddPayAdmin(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/AddPayAdmin',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  DeletePayAdmin(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/DeletePayAdmin',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  addLease(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/addLease',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getLeaseAdmin(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getLeaseAdmin',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getLeaseforAddTime(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getLeaseforAddTime',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  AddLeaseforTime(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/AddLeaseforTime',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getStoreOfmenu(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getStoreOfmenu',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  doneReport(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/doneReport',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getDataReport(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getDataReport',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  doneComment(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/doneComment',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getComment(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getComment',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  doneBooking(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/doneBooking',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  sendOrder(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/sendOrder',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getbookingList(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getbookingList',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getbookingListforpayment(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getbookingListforpayment',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  sendOrderpayment(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/sendOrderpayment',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

  getbookingListOrder(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getbookingListOrder',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  getPaymentOrder(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getPaymentOrder',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  
  confirm(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/confirm',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }
  getPaymentconfirm(body){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/getPaymentconfirm',body)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
      });
  }

}
