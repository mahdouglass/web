import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {QuoteModel} from "./quote-model";

@Injectable()
export class QuoteServiceService {
  quoteItems: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) { }

  getQuotes(){
    return this.quoteItems = this.angularFire.database.list('/quotes');
  }

  updateQuote(quote: any){
    this.quoteItems = this.getQuotes();
    this.quoteItems.update(quote.$key, {text: quote.text, votes: quote.votes});
  }

  upVoteQuote(quote: any){
    this.quoteItems = this.getQuotes();
    this.quoteItems.update(quote.$key, {votes: parseInt(quote.votes)+1});
  }

  removeQuote(quote: any){
    this.quoteItems = this.getQuotes();
    this.quoteItems.remove(quote.$key);
  }

  addQuote (quote: any){
    this.quoteItems = this.getQuotes();
    this.quoteItems.push(quote);
  }

}
