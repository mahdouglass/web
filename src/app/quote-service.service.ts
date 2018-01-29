import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireList} from "angularfire2/database/interfaces";
import {Observable} from "rxjs";

@Injectable()
export class QuoteServiceService {
  quoteRef: AngularFireList<any>;
  quoteItems: Observable<any[]>;

  constructor(private angularFire: AngularFireDatabase) { }

  getQuotes(){
    this.quoteRef = this.angularFire.list('/quotes');
    return this.quoteItems = this.quoteRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  updateQuote(quote: any){
    this.quoteRef.update(quote.key, {text: quote.text, votes: quote.votes});
  }

  upVoteQuote(quote: any){
    this.quoteRef.update(quote.key, {votes: (parseInt(quote.votes)+1)});
  }

  removeQuote(quote: any){
    this.quoteRef.remove(quote.key);
  }

  addQuote (quote: any){
    this.quoteRef.push(quote);
  }

}
