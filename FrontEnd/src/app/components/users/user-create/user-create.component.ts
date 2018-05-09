import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { User_image } from '../../../models/user_image';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User;
  selected:string;
  user_image: User_image;

  //A string to store the password confirmation
  passwordConfirmation: string; 

  constructor(private errorHandler: ErrorHandlerService, public auth: AuthService, private router: Router, private crud: CrudService, private data: DataService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home'])
    }
    this.user = new User('', '', '', '', '', null, null);
    this.selected = 'assets/img/faces/Picture1.png';
    console.log(this.selected);
  }

  /**
   * Method to create a user with the parameters
   * that are asked for in the registration view.
   */
  createUser() {

    if (this.validateNonEmptyFields() && this.areEqualPasswords()) {

      this.crud.registerUser(this.user)
        .subscribe(
          (res: User) => {
           this.user_image = new User_image(res.id, this.selected);
           this.data.create(this.user_image).subscribe(
             (res: User_image) => {
               this.errorHandler.showInformativeMessage('¡El registro fue exitoso! Revisa tu correo institucional para activar tu cuenta.');
               this.router.navigate(['login']);
             },
             (err: HttpErrorResponse) => {
               console.log(err);
               this.errorHandler.handleError(err);
             }
           )
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.errorHandler.handleError(err);
          }
        )
    }

    return false;
  }

  /**
   * Method to validate that all fields have been entered
   * (they're all necessary). If at least one of the fields
   * hasn't been entered, then a errorMessage displaying what the
   * problem is should be displayed.
   * 
   * @returns True, if all fields have been entered. Else,
   * return false.
   */
  validateNonEmptyFields() {
    if (!this.user.id || 
        !this.user.name || 
        !this.user.department_major || 
        !this.user.password || 
        !this.passwordConfirmation) {
          this.errorHandler.showErrorMessage('Debes introducir tu matrícula, nombre, carrera o departamento, contraseña y la confirmación de la misma.');
      return false;
    }
    else {
      return true;
    }
  }

  /**
   * Method to validate that the password was correctly
   * confirmed.
   * 
   * @returns True, if exactly the same password was entered
   * twice. Else, false.
   */
  areEqualPasswords() {

    if (this.user.password == this.passwordConfirmation) {
      return true;
    }
    else {
      this.errorHandler.showErrorMessage('La contraseña no fue confirmada correctamente. Inténtalo de nuevo.')
      return false;
    }
  }

  selectImage(number:string){
    this.selected = number;
  }
}
