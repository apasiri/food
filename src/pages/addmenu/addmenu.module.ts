import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddmenuPage } from './addmenu';

@NgModule({
  declarations: [
    AddmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AddmenuPage),
  ],
})
export class AddmenuPageModule {}
