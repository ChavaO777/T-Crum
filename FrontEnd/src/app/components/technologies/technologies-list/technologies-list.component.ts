import { Component, OnInit } from '@angular/core';
import { Technology } from '../../../models/technology.model';
import { CrudService } from '../../../services/crud.service';
import { HttpResponse } from 'selenium-webdriver/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-technologies-list',
  templateUrl: './technologies-list.component.html',
  styleUrls: ['./technologies-list.component.css']
})
export class TechnologiesListComponent implements OnInit {
  technologies: Technology[];
  newTechnology: Technology;
  
  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService) { }

  ngOnInit() {
    this.newTechnology = new Technology('', null, null);
    this.updateList();
  }

  deleteTechnology(id:number){
    this.crud.delete(this.crud.models.TECHNOLOGY, id)
    .subscribe(
      res => {
        this.removeTechnology(id);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  removeTechnology(id:number){
    let i;
    for(i=0; i<this.technologies.length; i++){
      if(this.technologies[i].id == id){
        this.technologies.splice(i, 1);
        break;
      }
    }
  }

  updateList(){
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

  onSubmit(event:true){
    this.updateList();
  }
}
