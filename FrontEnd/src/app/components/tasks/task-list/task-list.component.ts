import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  public user_story_id: number;

  constructor(private crud:CrudService, private router:Router, private route:ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {

    this.user_story_id = parseInt(this.route.snapshot.params.id);

    this.crud.list(this.crud.models.TASK)
    .subscribe(
      (res:Task[])=>{
        console.log(res);

        var tasksForUserStory: Task[] = new Array();

        for (var _i = 0; _i < res.length; _i++) {
          if (res[_i].user_story_id == this.user_story_id)
          {
            tasksForUserStory.push(res[_i]);
          }
        }

        this.tasks = tasksForUserStory;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  deleteTask(id: number){
    console.log("Deleting task")
    this.crud.delete(this.crud.models.TASK, id)
    .subscribe(
      (res:Response) => {
        this.errorHandler.showInformativeMessage('Tarea eliminada exitosamente.');
        let x = 0;
        for(let task of this.tasks){
          if(task.id == id){
            this.tasks.splice(x, 1);
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
