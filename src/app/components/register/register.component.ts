import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['',[ Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.registerUser(this.profileForm.value.email!, this.profileForm.value.password!).subscribe(
        {
          next: value => this.router.navigate(['/login']),
          error: error => console.error(error)
        }
      )
    }
  }
}
