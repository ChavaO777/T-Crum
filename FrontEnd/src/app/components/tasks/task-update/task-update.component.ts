import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';


@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  id: number;
  duration: number;
  name: string;
  completed: string;
  user_story_id: number;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = parseInt(this.route.snapshot.params.id);

    this.crud.retrieve(this.crud.models.TASK, this.id)
    .subscribe(
      (res:Task) => {
        console.log (res);

        this.duration = res.duration;
        this.name = res.name;
        this.completed = String(res.completed);
        this.user_story_id = res.user_story.id;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );

  }

  updateTask()
  {

    let body = {
      id: this.id,
      duration: this.duration,
      name: this.name,
      completed: this.completed,
      user_story_id: this.user_story_id
    };

    if(this.validate()){
      this.crud.update (this.crud.models.TASK, this.id, body)  
      .subscribe (
        (res: Response) => {
          this.errorHandler.showInformativeMessage('Tarea actualizada correctamente');
          this.router.navigate(['tasks']);
        },
        (err:HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }
    
  }

  validate(){
    if(!this.duration || this.duration < 1){
      this.errorHandler.showErrorMessage('La duración debe ser un número positivo.');
      return false;
    }

    if(!this.name){
      this.errorHandler.showErrorMessage('Debes agregar un nombre a tu tarea.');
      return false;
    }

    if(!this.user_story_id || this.user_story_id < 1){
      this.errorHandler.showErrorMessage('El ID de historia de usuario debe ser un número positivo.');
      return false;
    }

    if(!this.completed){
      this.errorHandler.showErrorMessage('Todos lo campos deben estar llenos.');
      return false;
    }

    return true;
  }
}
