import {Component, OnInit} from '@angular/core';
import {QuoteServiceService} from '../quote-service.service';
import {QuoteModel} from "../quote-model";
import {ImageService} from "../image.service";
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-root',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  images = Array();
  backgrounds = Array();
  quotes: any[];
  isUpVoted: boolean;

  background: string;
  image: string;
  quote: QuoteModel;
  randomQuoteInt: number = 0;
  randomBackgroundInt: number = 0;
  randomImageInt: number = 0;

  constructor(private quoteService: QuoteServiceService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.backgrounds = [
      "#c46a20",
      "#c4201f",
      "#bec229",
      "#7fa114"
    ];

    this.getImages();
    this.getRandomQuote();
  }

  getRandomQuote() {
    this.isUpVoted = false;
    this.quoteService.getQuotes().first()
      .subscribe(quotes => {
        this.quotes = quotes;

        this.randomQuoteInt = this.getRandomInt(this.quotes.length, this.randomQuoteInt);
        this.randomBackgroundInt = this.getRandomInt(this.backgrounds.length, this.randomBackgroundInt);
        this.randomImageInt = this.getRandomInt(this.images.length, this.randomImageInt);

        this.quote = this.quotes[this.randomQuoteInt];
        this.background = this.backgrounds[this.randomBackgroundInt];
        this.image = `url(${this.images[this.randomImageInt].path})`;
      });

  };

  getImages() {
    this.imageService.getImages()
      .subscribe(images => {
        console.log(images);
        this.images = images;
      });
  }

  upVoteQuote() {
    this.quoteService.upVoteQuote(this.quote);
    this.isUpVoted = true;
  }

  getRandomInt(max: number, current: number) {
    let random = Math.floor(Math.random() * (max - 1)) + 1;
    return current != random ? random : 0;
  }

}
