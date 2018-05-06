import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  user: User;
  //A string to store the password confirmation
  passwordConfirmation: string; 

  constructor(private auth: AuthService, private router: Router, private crud: CrudService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home'])
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.passwordConfirmation = '';
    this.user = new User('', '', '', '', '', null, null, '');
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

            /*  
              Ideally, a errorMessage of success should be displayed
              to let the user know that the registration was
              successful. So far, we're only taking the user 
              to the login view.
            */
            this.successMessage = 'The registration was successful!';
            this.router.navigate(['login']);
          },
          (err: HttpErrorResponse) => {
            console.log('Hello'); 
            console.log(err);
            if (err.error) {
              this.errorMessage = err.error.errorMessage;
            }
            else {
              this.errorMessage = err.error.error[0].errorMessage;
            }
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
      this.errorMessage = 'Debes introducir tu matrícula, nombre, carrera o departamento, contraseña y la confirmación de la misma.';
      return false;
    }
    else {
      this.errorMessage = '';
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

      this.errorMessage = 'La contraseña no fue confirmada correctamente. Inténtalo de nuevo.'
      return false;
    }
  }
}
