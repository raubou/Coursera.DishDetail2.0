import { Component, OnInit, Inject, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    expand()
  ]
})
/** menu component*/
export class MenuComponent implements OnInit {
  @Input()
  dishes: Dish[];

  selectedDish: Dish;
    /** menu ctor */
  constructor(private dishService: DishService, @Inject('WebServiceURL') private WebServiceURL) {

  }
  ngOnInit() {
    //this.dishes = this.dishService.getDishes();
    //this.dishService.getDishes().then((dishes) => this.dishes = dishes);
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}


