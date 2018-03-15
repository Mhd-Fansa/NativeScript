import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import { Page } from "ui/page";
import { Animation, AnimationDefinition } from "ui/animation";
import { View } from "ui/core/view";
import * as enums from "ui/enums";
import { CouchbaseService } from '../services/couchbase.service';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html'
})
export class ReservationComponent extends DrawerPage implements OnInit {

    reservation: FormGroup;
    cardLayout: View;
    cardSubmitedLayout: View;
    showReservationCard: boolean = true ;
    showCompletedCard: boolean = false;
    docId: string = "reservations";

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private page: Page,
        private couchbaseService: CouchbaseService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef) {
            super(changeDetectorRef);

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });

    }

    ngOnInit() {

    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text});
    }

    createModalView(args) {

       let options: ModalDialogOptions = {
           viewContainerRef: this.vcRef,
           context: args,
           fullscreen: false
       };

       this.modalService.showModal(ReservationModalComponent, options)
           .then((result: any) => {
               if (args === "guest") {
                   this.reservation.patchValue({guests: result});
               }
               else if (args === "date-time") {
                   this.reservation.patchValue({ dateTime: result});
               }
           });
         }

         couchbaseReservation() {
             let doc = this.couchbaseService.getDocument(this.docId);

             if ( doc == null) {
                 this.couchbaseService.createDocument({"reservations": []}, this.docId);
                 console.log("Your first reservation " + JSON.stringify(this.couchbaseService.getDocument(this.docId)));
             } else {
                 let reservations = doc.reservations;
                 reservations.push(this.reservation.value);

                 this.couchbaseService.updateDocument(this.docId, { "reservations": reservations });
                 // console.log("Subsequent reservation" + JSON.stringify(doc));
                 console.log("Thank you for coming back! Subsequent reservation: " + JSON.stringify(this.couchbaseService.getDocument(this.docId)));
             }
         }

         animateSubmission() {
             if (this.reservation) {
                 this.cardLayout = this.page.getViewById<View>('cardLayout');
                 this.cardSubmitedLayout = this.page.getViewById<View>('cardSubmitedLayout');

                 if (this.showReservationCard) {
                     //Animates out form
                     this.cardLayout.animate({
                         scale: { x:0, y:0 },
                         opacity: 0,
                         duration: 500
                     })
                     //The following line seems redundant, however, if this was not
                     //included, the second animation resulted in the completedCard only appearing
                     .then(() => {
                         this.cardSubmitedLayout.animate({
                             scale: { x:0, y:0 },
                             opacity: 0,
                             duration: 0
                         })
                         //Animates in completed information
                         .then(() => {
                             this.showReservationCard = false;
                             this.showCompletedCard = true;
                             this.cardSubmitedLayout.animate({
                                 scale: { x:1, y:1 },
                                 opacity: 1,
                                 duration: 500
                             })
                         })
                     })
                 };
             };
         };

    onSubmit() {
      this.couchbaseReservation();
      this.animateSubmission();
      console.log(JSON.stringify(this.reservation.value));
    }
}
