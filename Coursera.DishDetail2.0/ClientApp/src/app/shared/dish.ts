//import { Component } from '@angular/core';
import { Comment } from './comment';

//@Component({
    //selector: 'app-dish',
    //templateUrl: './dish.component.html',
    //styleUrls: ['./dish.component.css']
//})
/** dish component*/
export class Dish {
    /** dish ctor */
    constructor() {

  }
  id: string;
  name: string;
  image: string;
  category: string;
  featured: boolean;
  label: string;
  price: string;
  description: string;

  comments: Comment[];

}
