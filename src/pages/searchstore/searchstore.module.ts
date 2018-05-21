import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchstorePage } from './searchstore';

@NgModule({
  declarations: [
    SearchstorePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchstorePage),
  ],
})
export class SearchstorePageModule {}
