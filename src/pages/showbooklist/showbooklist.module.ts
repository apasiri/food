import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowbooklistPage } from './showbooklist';

@NgModule({
  declarations: [
    ShowbooklistPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowbooklistPage),
  ],
})
export class ShowbooklistPageModule {}
