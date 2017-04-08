import {Component, OnInit} from '@angular/core';
import {QuoteServiceService} from '../quote-service.service';

@Component({
  selector: 'app-list-quote-component',
  templateUrl: './list-quote-component.component.html',
  styleUrls: ['./list-quote-component.component.css']
})
export class ListQuoteComponentComponent implements OnInit {
  editQuote: any;
  quotes: any[];

  constructor(private quoteService: QuoteServiceService) { }

  getQuotes() {
    this.quoteService.getQuotes()
      .subscribe(quotes => {
        this.quotes = quotes;
      });
  }

  editQuoteObject(editQuote: any){
    this.editQuote = editQuote;
  }

  cancelEditQuote(){
    this.editQuote = null;
  }

  updateQuote(){
    this.quoteService.updateQuote(this.editQuote);
    this.editQuote = null;
  }

  removeQuote(){
    this.quoteService.removeQuote(this.editQuote);
    this.editQuote = null;
  }

  ngOnInit() {
    this.getQuotes();
  }

}
