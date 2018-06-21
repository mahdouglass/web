import {Component, OnInit} from '@angular/core';
import {SafePipe} from '../safe.pipe';
import {QuoteServiceService} from '../quote-service.service';
import {QuoteModel} from '../quote-model';
import {ImageService} from '../image.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import fontawesome from '@fortawesome/fontawesome';
import { first, filter } from 'rxjs/operators';
import {faSyncAlt, faThumbsUp, faCommentAlt, faCopy} from "@fortawesome/fontawesome-free-solid";

@Component({
  selector: 'app-root',
  templateUrl: './mig-ipsum.component.html',
  styleUrls: ['./mig-ipsum.component.css']
})
export class MigIpsumComponent implements OnInit {
  images = Array();
  backgrounds = Array();
  quotes: any[];
  migIpsum: string;
  isUpVoted: boolean;

  background: string;
  image: string;
  quote: any;
  paragraphs: number;
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

    this.route.queryParams
      .subscribe(params => {
        this.paragraphs = +params['paragraphs'];
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
    this.getMigIpsum(this.paragraphs ? false : true);
  }

  getMigIpsum(random: boolean) {
    this.isCopied1 = false;
    this.isUpVoted = false;
    this.quoteService.getMigIpsum()
      .subscribe(quotes => {
        this.quotes = quotes;
        this.migIpsum = null;

        if(random) {
          this.paragraphs = this.getRandomInt(7, 0);
          this.backgroundId = this.getRandomInt(this.backgrounds.length, this.randomBackgroundInt);
          this.imageId = this.getRandomInt(this.images.length, this.randomImageInt);
        }

        const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
        queryParams['paragraphs'] = this.paragraphs;
        queryParams['imageId'] = this.imageId;
        queryParams['backgroundId'] = this.backgroundId;
        this.router.navigate(['/mig-ipsum'], { queryParams: queryParams });

        for(var x = 0; x < this.paragraphs; x++) {
          for (var i = 0; i <= this.getRandomInt(this.quotes.length, this.randomQuoteInt); i++) {
            this.quote = this.quotes[this.getRandomInt(this.quotes.length, 0)].text;

            if (this.migIpsum) {
              //this.quote = this.omitDupeQuote(this.migIpsum, this.quote);
            }

            if (this.quote) {
              this.quote = this.sanitizeQuote(this.quote);

              this.migIpsum =  `${this.migIpsum ? this.migIpsum : ''}${i != 0 ? ' ':''}${this.quote}`;
            }
          }

          this.migIpsum = `${this.migIpsum}<br /><br />`;
        }

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

  omitDupeQuote(paragraph: string, quote: string){
    return paragraph.indexOf(quote) < 0 ? quote : null;
  }

  sanitizeQuote(quote: string){
    return quote.match("[.?!]") ? quote : `${quote}.`;
  }

}
