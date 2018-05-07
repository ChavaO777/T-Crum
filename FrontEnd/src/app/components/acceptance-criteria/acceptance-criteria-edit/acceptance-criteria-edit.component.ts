import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Acceptance_criteria } from '../../../models/acceptance_criteria.model';
import { User_story } from '../../../models/user_story.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-acceptance-criteria-edit',
  templateUrl: './acceptance-criteria-edit.component.html',
  styleUrls: ['./acceptance-criteria-edit.component.css']
})
export class AcceptanceCriteriaEditComponent implements OnInit {
  acceptance_criteria: Acceptance_criteria;
  user_story: User_story;
  user_story_id : number;

  constructor(private errorHandler:ErrorHandlerService, private crud: CrudService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.acceptance_criteria = new Acceptance_criteria(null, null, null, null, null, null);
    let id = this.route.snapshot.params.id;
    this.crud.retrieve(this.crud.models.ACCEPTANCE_CRITERIA, id)
    .subscribe(
      (res:Acceptance_criteria) => {
        this.acceptance_criteria = res;
        this.user_story_id = res.user_story_id;
      },
      (err:HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  update(){
    console.log(this.acceptance_criteria);
    if(this.validate()){
      this.crud.update(this.crud.models.ACCEPTANCE_CRITERIA, this.acceptance_criteria.id, this.acceptance_criteria)
      .subscribe(
        (res:Acceptance_criteria) => {
          this.acceptance_criteria = res;
          this.router.navigate(['/user-stories/'+this.user_story_id]);
        },
        (err:HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
    }
    return false;
  }

  validate(){
    if(!this.acceptance_criteria.name){
      this.errorHandler.showErrorMessage('Debes introducir el nombre del criterio de aceptación.')
      return false;
    }
    if(!this.acceptance_criteria.type){
      this.errorHandler.showErrorMessage('Debes introducir el tipo del criterio de aceptación.');
      return false;
    }
    if(!this.acceptance_criteria.user_story_id){
      this.errorHandler.showErrorMessage('No hay historia de usuario relacionada');
      return false;
    }
    else{
      console.log('Validado');
      return true;
    }
  }

  onSelectCancel(){
    this.router.navigate(['/user-stories', this.acceptance_criteria.user_story_id]);
  }

}
