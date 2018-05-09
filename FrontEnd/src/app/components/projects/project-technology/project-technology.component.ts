import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { Technology } from '../../../models/technology.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-project-technology',
  templateUrl: './project-technology.component.html',
  styleUrls: ['./project-technology.component.css']
})
export class ProjectTechnologyComponent implements OnInit {
  project: Project;
  projectTechnologies: Technology[];
  technologies: Technology[];
  technology_id: number;
  version: string;
  
  constructor(private errorHandler:ErrorHandlerService, public auth:AuthService, private crud:CrudService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.version = '';
    let id = this.route.snapshot.params.id;
    this.getProjectTechnologies(id);
    this.getAllTechnologies();
  }

  getAllTechnologies(){
    this.crud.list(this.crud.models.TECHNOLOGY)
    .subscribe(
      (res:Technology[]) => {
        this.technologies = res;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      } 
    )
  }

  getProjectTechnologies(id:number){
    this.crud.retrieve(this.crud.models.PROJECT, id)
    .subscribe(
      (res:Project) => {
        this.project = res;
        this.projectTechnologies = res.technologies;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      } 
    )
  }

  addTechnology(){  
    if(this.validate()){
      let body = {
        technology_id: this.technology_id,
        project_id: this.project.id,
        version: this.version
      };

      this.crud.create(this.crud.models.PROJECT_TECHNOLOGY, body)
      .subscribe(
        res => {
          this.version = '';
          this.getProjectTechnologies(this.project.id);
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
    }
    
    return false;
  }

  validate(){
    if(!this.version || !this.technology_id){
      this.errorHandler.showErrorMessage("Debes escoger una tecnología y especificar una versión.");
      return false;
    }

    return true;
  }

  deleteTechnology(id:number){
    this.crud.delete(this.crud.models.PROJECT_TECHNOLOGY, id)
    .subscribe(
      res => {
        this.getProjectTechnologies(this.project.id);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }
}
