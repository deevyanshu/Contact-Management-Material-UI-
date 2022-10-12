import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactService } from '../contact.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedin:boolean=false;

  constructor(private dialog:MatDialog,private service:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedin=this.service.isUserLoggedIn();
  }

  openDialog()
  {
    this.dialog.open(RegisterComponent,{
      width:"50%"
    });
  }

  openLogin(){
    
      this.dialog.open(LoginComponent,{
        width:"50%"
      })
    
    
  }

  logout()
  {
    this.service.logout();
    this.router.navigate(["front"]);
    this.isLoggedin=false;
  }

  addContact()
  {
    this.dialog.open(AddContactComponent,{
      width:"50%"
    })
  }

}
