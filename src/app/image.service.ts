import { Injectable } from '@angular/core';
import {ImageModel} from './image-model';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireList} from "angularfire2/database/interfaces";
import {Observable} from "rxjs";

@Injectable()
export class ImageService {
  imageRef: AngularFireList<any>;
  imageItems: Observable<any[]>;

  constructor(private angularFire: AngularFireDatabase) { }

  getImages(){
    this.imageRef = this.angularFire.list('/images');
    return this.imageItems = this.imageRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  updateImage(image: any){
    this.imageRef.update(image.key, {path: image.path, votes: image.votes});
  }

  removeImage(image: any){
    this.imageRef.remove(image.key);
  }

  addImage (image: ImageModel){
    this.imageRef.push(image);
  }

}
