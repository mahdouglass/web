import {Component, OnInit} from '@angular/core';
import {QuoteServiceService} from '../quote-service.service';
import {QuoteModel} from '../quote-model';
import {ImageService} from '../image.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { first, filter } from 'rxjs/operators';

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
  quoteId: number;
  imageId: number;
  backgroundId: number;
  randomQuoteInt = 0;
  randomBackgroundInt = 0;
  randomImageInt = 0;
  isCopied1: boolean = false;
  urlLink: string;

  constructor(private quoteService: QuoteServiceService, private imageService: ImageService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.urlLink = window.location.href;
    this.backgrounds = [
      '#c46a20',
      '#c4201f',
      '#bec229',
      '#7fa114'
    ];

    this.route.queryParams
      .subscribe(params => {
        this.quoteId = +params['quoteId'];
        this.imageId = +params['imageId'];
        this.backgroundId = +params['backgroundId'];
      });

    this.getImages();
    this.getQuotes(this.quoteId ? false : true);
  }

  getQuotes(random: boolean) {
    this.isUpVoted = false;
    this.quoteService.getQuotes()
      .subscribe(quotes => {
        this.quotes = quotes;

        if(random) {
          this.quoteId = this.getRandomInt(this.quotes.length, this.randomQuoteInt);
          this.backgroundId = this.getRandomInt(this.backgrounds.length, this.randomBackgroundInt);
          this.imageId = this.getRandomInt(this.images.length, this.randomImageInt);
        }

        const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
        queryParams['quoteId'] = this.quoteId;
        queryParams['imageId'] = this.imageId;
        queryParams['backgroundId'] = this.backgroundId;
        this.router.navigate(['.'], { queryParams: queryParams });

        this.quote = this.quotes[this.quoteId];
        this.background = this.backgrounds[this.backgroundId];
        this.image = `url(${this.images[this.imageId].path})`;
      });
  }

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

  getShareLink() {

    this.isUpVoted = true;
  }

  getRandomInt(max: number, current: number) {
    const random = Math.floor(Math.random() * (max - 1)) + 1;
    return current != random ? random : 0;
  }

}
