import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, public auth:AuthService) { }

  ngOnInit() {
    if(this.auth.isRoot()){
      this.getAllProjects();
    }
    else{
      this.getUserProjects();
    }
    
  }

  getAllProjects(){
    this.crud.list(this.crud.models.PROJECT)
    .subscribe(
      (res:Project[])=>{
        console.log(res);
        this.projects = res;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  getUserProjects(){
    this.crud.retrieve(this.crud.models.USER, this.auth.getUser().id)
    .subscribe(
      (res:User)=>{
        console.log(res.projects);
        this.projects = res.projects;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  createProject(){
    this.router.navigate(['projects/create']);
  }

  updateProject(updateID: number){
    this.router.navigate(['projects/update/'+updateID]);
  }

  retrieveProject(retrieveID: number){
    this.router.navigate(['projects/'+retrieveID]);
  }

  deleteProject(id: number){
    console.log("Deleting")
    this.crud.delete(this.crud.models.PROJECT, id)
    .subscribe(
      (res:Response) => {
        this.errorHandler.showInformativeMessage('Proyecto eliminado exitosamente.');
        let x = 0;
        for(let project of this.projects){
          if(project.id == id){

            this.projects.splice(x, 1);
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
