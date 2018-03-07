import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Comment } from '../shared/comment';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'app-comment',
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    commentModal: FormGroup;

    constructor(
      private params: ModalDialogParams,
      private formBuilder: FormBuilder) {

        this.commentModal = this.formBuilder.group({
            author : ['', Validators.required],
            rating: 1,
            comments: ['', Validators.required]
        });
      }

        ngOnInit() {

        }

        prepareCommment(): Comment {
            const formModel = this.commentModal.value;
            const saveComment: Comment = {
                author: formModel.author as string,
                rating: formModel.rating as number,
                comment: formModel.comment as string,
                date: new Date().toISOString() as string
            };
            console.log("saveComment:"
                + "\n author=" + saveComment.author
                + "\nrating=" + saveComment.rating
                + "\ncomment=" + saveComment.comment);
            return saveComment;
        }

  public onSubmit() {
    console.log(JSON.stringify(this.commentModal.value));
    const comm = this.prepareCommment();
    this.params.closeCallback(comm);
        }
}
