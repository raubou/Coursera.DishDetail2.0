import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
//import { visibility } from '../animations/app.animations';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  animations: [
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  @Input()
  dish: Dish;
  dishIds: string[];
  pre: string;
  next: string;
  dishcopy: Dish;
  errMess: string;
  comment: Comment;
  visibility = 'shown';
  constructor(private dishService: DishService, private route: ActivatedRoute, private location: Location) {
 
    
  }


  ngOnInit() {
    //this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    //this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params(['id']))
    //  .subscribe(dish => this.dish = dish);

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    //this.route.params
    //  .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    //  .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
    //    errmess => this.errMess = <any>errmess);

    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess);
    console.log(this.dish);
  }

  setPrevNext(id: string) {

  }

  onSubmit() {

    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
      
   }

}
//const DISH = {
//  id: '0',
//  name: 'Uthappizza',
//  image: '/assets/images/uthappizza.png',
//  category: 'mains',
//  featured: true,
//  label: 'Hot',
//  price: '4.99',
//  description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
//  comments: [
//    {
//      rating: 5,
//      comment: 'Imagine all the eatables, living in conFusion!',
//      author: 'John Lemon',
//      date: '2012-10-16T17:57:28.556094Z',
//      image: '/assets/images/alberto.png'
//    },
//    {
//      rating: 4,
//      comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
//      author: 'Paul McVites',
//      date: '2014-09-05T17:57:28.556094Z',
//      image: '/assets/images/buffet.png'
//    },
//    {
//      rating: 3,
//      comment: 'Eat it, just eat it!',
//      author: 'Michael Jaikishan',
//      date: '2015-02-13T17:57:28.556094Z',
//      image: '/assets/images/elaicheesecake.png'
//    },
//    {
//      rating: 4,
//      comment: 'Ultimate, Reaching for the stars!',
//      author: 'Ringo Starry',
//      date: '2013-12-02T17:57:28.556094Z',
//      image: '/assets/images/logo.png'
//    },
//    {
//      rating: 2,
//      comment: 'It\'s your birthday, we\'re gonna party!',
//      author: '25 Cent',
//      date: '2011-12-02T17:57:28.556094Z',
//      image: '/assets/images/vadonut.png'
//    }
//  ]
//};
