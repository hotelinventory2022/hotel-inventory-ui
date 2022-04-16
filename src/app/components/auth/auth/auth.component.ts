import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/core/models/constants';
import { Role } from 'src/app/core/models/roles';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginRequest } from 'src/app/core/models/auth';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {}

  roles!: Role[];
  selectedRole!: Role;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });
  // Access formcontrols getter
  get role() {
    return this.loginForm.get('role');
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles() {
    this.roles = [];
    const roles = this.localStorageService.get(Constants.Roles);
    if (roles.length > 0) {
      this.roles = JSON.parse(roles);
    } else {
      this.roleService.getRoles().subscribe(
        (res) => {
          if (res.statusCode === HttpStatusCode.Ok) {
            res.data.forEach((item: any) => {
              let role = new Role();
              role.roleId = item.id;
              role.roleName = item.name;
              role.roleDescription = item.description;
              this.roles.push(role);
            });
            this.localStorageService.set(
              Constants.Roles,
              JSON.stringify(this.roles)
            );
          }
        },
        (err) => console.error(err)
      );
    }
    console.log('roles -->', this.roles);
  }

  login(form: FormGroup) {
    const loginRequest: LoginRequest = {
      email: form.value.email,
      password: form.value.password,
      roleId: form.value.role.roleId,
    };
    console.log('login -->', loginRequest);
    this.authService.login(loginRequest).subscribe(
      (res) => {
        if (res.statusCode === HttpStatusCode.Ok) {
          this.localStorageService.set(
            Constants.LoggedInUserDetails,
            JSON.stringify(res.data)
          );
          this.notificationService.showSuccess(res.message, 'Login', 5000);
        }
      },
      (err) => console.error(err)
    );
  }

  // changeRole(e: any) {
  //   this.role?.setValue(e.target.value, {
  //     onlySelf: true,
  //   });
  // }

  // togglePassword() {
  //   const togglePassword = document.querySelector('#togglePassword');
  //   const password = document.querySelector('#password');
  //   // toggle the type attribute
  //   const passWordtype =
  //     password.getAttribute('type') === 'password' ? 'text' : 'password';
  //   password.setAttribute('type', type);

  //   // toggle the icon
  //   this.classList.toggle('bi-eye');
  // }
}
