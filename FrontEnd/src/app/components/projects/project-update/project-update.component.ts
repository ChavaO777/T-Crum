import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  project: Project;
  users: User[];
  id: number;
  begin_date: string;
  end_date: string;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  
  ngOnInit() {
    this.project =  new Project(null, null, null, null, null, null, null, null);
    this.begin_date = "";
    this.end_date = "";

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
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

    this.crud.retrieve(this.crud.models.PROJECT, this.id)
    .subscribe(
      (res:Project)=>{
        console.log(res);
        this.project = res;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  updateProject(){
    if(this.validate()){
      this.crud.update(this.crud.models.PROJECT, this.id, this.project)
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
