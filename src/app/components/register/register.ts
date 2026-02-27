import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [ReactiveFormsModule],
})
export class Register {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['guest', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const user = new User(
        this.form.value.username!,
        this.form.value.password!,
        this.form.value.role!,
      );

      this.auth.register(user).subscribe(() => {
        alert('Registered successfully');
        this.router.navigate(['/login']);
      });
    }
  }
}
