import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  productForm:FormGroup;
  errormes:string="Invalid Credentials";
  isLoggedin:boolean=false;

  constructor(private router:Router,private service:ContactService,private dialogref:MatDialogRef<LoginComponent>,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.productForm=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  handleLogin(){
    if(this.productForm.valid)
    {
      
    return this.service.authenticationService(this.username,this.password)
    .subscribe((result)=>{
      this.productForm.reset();
      this.dialogref.close();      
      this.isLoggedin=true;
      this.router.navigate(["/dashboard"]);
      
    },error=>{
      let ele=document.getElementById("loginerror")
      ele.style.display="inline-block";
    });
  }else{
    this.errormes="fill correct details";
    let ele=document.getElementById("loginerror")
      ele.style.display="inline-block";
      
    return ""
  }
  
  }

}
