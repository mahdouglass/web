import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { QuoteServiceService } from './quote-service.service';
import { RouterModule, Routes} from '@angular/router';

import { AddQuoteComponentComponent } from './add-quote-component/add-quote-component.component';
import { ListQuoteComponentComponent } from './list-quote-component/list-quote-component.component';
import { QuoteComponent } from './quote/quote.component';
import { ImageService } from "./image.service";

export const firebaseConfig = {
  apiKey: 'AIzaSyCFn5hwCZRxOsl2GZ2x7HNCu-eFEmDZQxE',
  authDomain: 'blazing-inferno-2073.firebaseapp.com',
  databaseURL: 'https://blazing-inferno-2073.firebaseio.com',
  projectId: 'blazing-inferno-2073',
  storageBucket: 'blazing-inferno-2073.appspot.com',
  messagingSenderId: '927514393456'
};

const appRoutes: Routes = [
  { path: 'admin', component: ListQuoteComponentComponent},
  { path: '', component: QuoteComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ListQuoteComponentComponent,
    QuoteComponent,
    AddQuoteComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ QuoteServiceService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
