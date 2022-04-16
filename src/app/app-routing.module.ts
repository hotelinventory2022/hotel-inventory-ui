import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/login/auth.component';
import { HomeComponent } from './components/home/home.component';
import { UploadPropertyComponent } from './components/owner/upload-property/upload-property.component';
import { AuthorizationGuard } from './core/guards/authorization.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'upload-property',
    component: UploadPropertyComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
