import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['',[ Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.loginUser(this.profileForm.value.email!, this.profileForm.value.password!).subscribe(
        {
          next: value => {
            this.authService.setAuth(value.token, this.profileForm.value.email!, value.roleUser);
            this.authService.authenticated({
              token: value.token,
              emailUser: this.profileForm.value.email!,
              roleUser: value.roleUser
            });
            this.router.navigate(['/products']);
          },
          error: error => console.error(error)
        }
      )
    }
  }

}
