import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User_story } from '../../../models/user_story.model';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-user-story-list',
  templateUrl: './user-story-list.component.html',
  styleUrls: ['./user-story-list.component.css']
})
export class UserStoryListComponent implements OnInit {
  sprint_id: number;
  user_stories: User_story[];

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService) { }

  ngOnInit() {
    this.sprint_id = 2;
    this.crud.list(this.crud.models.USER_STORY)
    .subscribe(
      (res:User_story[])=>{
        console.log(res);
        this.user_stories = res;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  deleteUserStory(id: number){
    this.crud.delete(this.crud.models.USER_STORY, id)
    .subscribe(
      (res:Response) => {
        let x = 0;
        for(let user_story of this.user_stories){
          if(user_story.id == id){
            this.user_stories.splice(x, 1);
          }
          x++;
        }
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

}
