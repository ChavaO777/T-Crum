import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.css']
})

export class MemberUpdateComponent implements OnInit {

  message: string;
  user: Member;

  constructor(private crud:CrudService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.user = new Member(null, null, null, null, null, null, null, null, null);
    this.message = '';
    let id = this.route.snapshot.params.id;
    this.crud.retrieve(this.crud.models.MEMBER, id)
    .subscribe(
      (res: Member) => {
        this.user = res;
        console.log(this.user);
      },
      (err: HttpErrorResponse) => {
        if(err.error){
          this.message = err.error.message;
        }
        else {
          this.message = err.error.errors[0].message;
        }
      }
    )
  }

  updateMember(){
    if(this.validateNonEmptyFields()){

    }
  }

  validateNonEmptyFields() {
    if (!this.user.id || 
        !this.user.name || 
        !this.user.department_major || 
        !this.user.password || 
        !this.passwordConfirmation) {
      this.message = 'Debes introducir tu matrícula, nombre, carrera o departamento, contraseña y la confirmación de la misma.';
      return false;
    }
    else {
      this.message = '';
      return true;
    }
  }

  areEqualPasswords() {

    if (this.member.password == this.passwordConfirmation) {

      return true;
    }
    else {

      this.errorMessage = 'La contraseña no fue confirmada correctamente. Inténtalo de nuevo.'
      return false;
    }
  }
}
