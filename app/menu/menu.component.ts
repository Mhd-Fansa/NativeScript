
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';

@Component({
  selector: 'app-menu',
    moduleId: module.id,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends DrawerPage implements OnInit {
  dishes: Dish[];

  errMess: string;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL,
    private changeDetectorRef:ChangeDetectorRef)
     {
        super(changeDetectorRef);
      }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

}
