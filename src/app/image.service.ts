import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {ImageModel} from "./image-model";

@Injectable()
export class ImageService {
  imageItems: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) { }

  getImages(){
    return this.imageItems = this.angularFire.database.list('/images');
  }

  updateImage(image: any){
    this.imageItems = this.getImages();
    this.imageItems.update(image.$key, {path: image.path, votes: image.votes});
  }

  removeImage(image){
    this.imageItems= this.getImages();
    this.imageItems.remove(image.$key);
  }

  addImage (images: FirebaseListObservable<any []>, image: ImageModel){
    images.push(image);
  }

}
