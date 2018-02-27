import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-menu',
    moduleId: module.id,
  templateUrl: './about.component.html'
})
export class AboutComponent extends DrawerPage implements OnInit {

  leaders: Leader[];
  leaderErrMess: string;

  constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL)
     {
        super(changeDetectorRef);
      }

  ngOnInit() {
    this.leaderservice.getLeaders()
    .subscribe(leaders => this.leaders = leaders,
      errmess => this.leaderErrMess = <any>errmess);
  }

}
