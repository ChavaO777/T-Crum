import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  project: Project;
  users: User[];

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router) { }

  ngOnInit() {
    this.crud.list(this.crud.models.USER)
    .subscribe(
      (res:User[])=>{
        console.log(res);
        this.users = res;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
    this.project = new Project('','',null,null, '', '', '', '');
  }

  createProject(){
    if(this.validate()){
      this.crud.create(this.crud.models.PROJECT, this.project)
      .subscribe(
        (res:Project)=>{
          console.log(res);
          this.project = res;
          this.router.navigate(['projects']);
        },
        (err:HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
        
    }
    
  }

  validate(){
    if(!this.project.vision && !this.project.name && !this.project.begin_date && !this.project.end_date && !this.project.background && !this.project.risks && !this.project.reach && !this.project.scrum_master_id){
      this.errorHandler.showErrorMessage('Debes introducir todos los campos');
      return false;
    }
    else{
      return true;
    }
  }
}
