import {Component, Input, OnInit} from '@angular/core';
import {QuoteModel} from "../quote-model";
import {QuoteServiceService} from "../quote-service.service";

@Component({
  selector: 'app-add-quote-component',
  templateUrl: './add-quote-component.component.html',
  styleUrls: ['./add-quote-component.component.css']
})

export class AddQuoteComponentComponent implements OnInit {
  quote: QuoteModel = new QuoteModel();


  constructor(private quoteService: QuoteServiceService) {
  }

  ngOnInit() {
  }

  addQuote(){
    this.quote.votes = 0;
    this.quoteService.addQuote(this.quote);
  }
}
