import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioAddComponent } from './component/usuario-add/usuario-add.component';
import { GuardianGuard } from './service/guardian.guard';
import { UsuarioReportComponent } from './component/usuario-report/usuario-report.component';
import { BarChartComponent } from './component/bar-chart/bar-chart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardianGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardianGuard] },
  { path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardianGuard] },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardianGuard] },
  { path: 'usuarioReport', component: UsuarioReportComponent, canActivate: [GuardianGuard] },
  { path: 'chart', component: BarChartComponent, canActivate: [GuardianGuard] }

];

//export const appRoutes : ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
