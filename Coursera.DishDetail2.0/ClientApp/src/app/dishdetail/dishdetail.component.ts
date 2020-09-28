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

