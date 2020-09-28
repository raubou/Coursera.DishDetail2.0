import { Component, OnInit } from '@angular/core';
import { visibility, flyInOut, expand } from '../animations/app.animations';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

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
  leaders: Leader[];
  constructor(private leaderService: LeaderService) {

  }
  ngOnInit() {
    this.leaders = this.leaderService.getLeaders();
  }
}
