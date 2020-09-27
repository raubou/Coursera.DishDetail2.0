import { Component } from '@angular/core';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
/** about component*/
export class AboutComponent {
    /** about ctor */
    constructor() {

    }
}
