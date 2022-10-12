import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FrontComponent } from './front/front.component';
import { RegisterComponent } from './register/register.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FrontComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddContactComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
