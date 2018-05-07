import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-project-retrieve',
  templateUrl: './project-retrieve.component.html',
  styleUrls: ['./project-retrieve.component.css']
})
export class ProjectRetrieveComponent implements OnInit {

  project: Project;
  id: number;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.project =  new Project(null, null, null, null, null, null, null, null, null);
    this.project.scrum_master = new User(null, null, null, null, null, null, null);

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.crud.retrieve(this.crud.models.PROJECT, this.id)
    .subscribe(
      (res:Project)=>{
        console.log(res);
        this.project = res;
        console.log(this.project.scrum_master)
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

}
