import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';

@Component({
  selector: 'app-menu',
    moduleId: module.id,
  templateUrl: './contact.component.html'
})
export class ContactComponent extends DrawerPage implements OnInit {

  constructor(
    private changeDetectorRef:ChangeDetectorRef)
     {
        super(changeDetectorRef);
      }

  ngOnInit() {}

}
