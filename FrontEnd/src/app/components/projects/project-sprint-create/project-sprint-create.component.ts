import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Sprint } from '../../../models/sprint.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-project-sprint-create',
  templateUrl: './project-sprint-create.component.html',
  styleUrls: ['./project-sprint-create.component.css']
})
export class ProjectSprintCreateComponent implements OnInit {

  project: Project;
  psprints: Sprint[];
  sprint: Sprint;
  projectID: number;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.project =  new Project(null, null, null, null, null, null, null, null, null, null, null, null);
    this.psprints = null;
    this.projectID = parseInt(this.route.snapshot.paramMap.get("id"));
    this.sprint = new Sprint(null, null, null, null, this.projectID);
    this.crud.retrieve(this.crud.models.PROJECT, this.projectID)
    .subscribe(
      (res:Project)=>{
        console.log(res);
        this.project = res;
        this.psprints = this.project.sprints;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  createSprint(){
    if(this.validate()){
      this.crud.create(this.crud.models.SPRINT, this.sprint)
      .subscribe(
        (res:Sprint)=>{
          console.log(res);
          this.sprint = res;
          this.router.navigate(['projects/'+this.projectID]);
          this.psprints.push(this.sprint);
        },
        (err:HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
      
    }
  }

  deleteSprint(sprintID: number){
    console.log("Deleting")
    this.crud.delete(this.crud.models.SPRINT, sprintID)
    .subscribe(
      (res:Response) => {
        this.errorHandler.showInformativeMessage('Se eliminó el sprint exitosamente.');
        let x = 0;
        for(let psprint of this.psprints){
          if(psprint.id == sprintID){

            this.psprints.splice(x, 1);
          }
          x++;
        }
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  validate(){
    if(!this.sprint.days || !this.sprint.comment || !this.sprint.project_id ){
      this.errorHandler.showErrorMessage('Debes introducir todos los campos');
      return false;
    }
    else{
      return true;
    }
  }
}
