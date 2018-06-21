import {Component, OnInit} from '@angular/core';
import {QuoteServiceService} from '../quote-service.service';
import {QuoteModel} from '../quote-model';
import {ImageService} from '../image.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import fontawesome from '@fortawesome/fontawesome';
import { first, filter, map } from 'rxjs/operators';
import {faSyncAlt, faThumbsUp, faCommentAlt, faCopy} from "@fortawesome/fontawesome-free-solid";

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
  inSpace: boolean;
  randomQuoteInt = 0;
  randomBackgroundInt = 0;
  randomImageInt = 0;
  isCopied1: boolean = false;
  urlLink: string;

  constructor(private quoteService: QuoteServiceService, private imageService: ImageService, private route: ActivatedRoute, private router: Router) {
    fontawesome.library.add(faCommentAlt);
    fontawesome.library.add(faSyncAlt);
    fontawesome.library.add(faThumbsUp);
    fontawesome.library.add(faCopy);
  }

  ngOnInit() {
    this.urlLink = window.location.href;
    this.isCopied1 = false;

    this.route.queryParams
      .subscribe(params => {
        this.quoteId = +params['quoteId'];
        this.imageId = +params['imageId'];
        this.backgroundId = +params['backgroundId'];
        this.inSpace = +params['inSpace'] === 1 ? true : false;
      });

    if(this.inSpace){
      this.backgrounds = [
        `https://res.cloudinary.com/flannelware/image/upload/TheCubanBackgrounds/explosion.gif`,
        `https://res.cloudinary.com/flannelware/image/upload/TheCubanBackgrounds/stars.gif`,
        `https://res.cloudinary.com/flannelware/image/upload/TheCubanBackgrounds/solar.gif`,
        `https://res.cloudinary.com/flannelware/image/upload/TheCubanBackgrounds/explosion.gif`,
      ];
    }
    else {
      this.backgrounds = [
        '#c46a20',
        '#c4201f',
        '#bec229',
        '#7fa114'
      ];
    }

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
        this.background = this.inSpace ? `url(${this.backgrounds[this.backgroundId]})` : this.backgrounds[this.backgroundId];
        this.image = `url(${this.images[this.imageId].path})`;
      });
  }

  getImages() {
    this.imageService.getImages()
      .subscribe(images => {
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
