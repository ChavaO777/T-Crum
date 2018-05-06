import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User_story } from '../../../models/user_story.model';
import { Acceptance_criteria } from '../../../models/acceptance_criteria.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-user-story-retrieve',
  templateUrl: './user-story-retrieve.component.html',
  styleUrls: ['./user-story-retrieve.component.css']
})
export class UserStoryRetrieveComponent implements OnInit {

  user_story: User_story;
  id: number;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.user_story =  new User_story(null, null, null, null, null);

    this.id = parseInt(this.route.snapshot.params.id);

    this.crud.retrieve(this.crud.models.USER_STORY, this.id)
    .subscribe(
      (res:User_story)=>{
        console.log(res);
        this.user_story = res;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

}
