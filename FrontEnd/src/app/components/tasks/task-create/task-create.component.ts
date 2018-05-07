import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Task } from '../../../models/task.model';


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  duration: number;
  name: string;
  completed: string;
  user_story_id: number;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.message = "Creation component ready";
    console.log("Creation component ready");

    this.duration = 0;
    this.name = "";
    this.completed = "false";

    this.user_story_id = this.route.snapshot.params.user_story_id;
  }

  createTask()
  {
    console.log ("Creating task")

    let body = {
      id: null,
      duration: this.duration,
      name: this.name,
      completed: this.completed,
      user_story_id: this.user_story_id
    };
    if(this.validate()){
      this.crud.create (this.crud.models.TASK, body)  
      .subscribe (
        (res: Task) => {
          this.errorHandler.showInformativeMessage('Tarea creada correctamente');
          this.router.navigate(['user-stories/' + res.user_story_id]);
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
