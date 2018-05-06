import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-user-story-create',
  templateUrl: './user-story-create.component.html',
  styleUrls: ['./user-story-create.component.css']
})
export class UserStoryCreateComponent implements OnInit {

  weight: number;
  scrum_board_status: number;
  description: string;
  priority: number;
  sprint_id: number;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.weight = 0;
    this.scrum_board_status = 0;
    this.description = '';
    this.priority = 0;
    this.sprint_id = this.route.snapshot.params.sprint_id;
  }

  createUserStory(){

    let body = {
      id: null,
      weight: this.weight,
      scrum_board_status: this.scrum_board_status,
      description: this.description,
      priority: this.priority,
      sprint_id: this.sprint_id
    };

    this.crud.create(this.crud.models.USER_STORY, body)
    .subscribe(
      (res: Response) => {
        this.router.navigate(['user-stories']);
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
    return false;
  }

}
