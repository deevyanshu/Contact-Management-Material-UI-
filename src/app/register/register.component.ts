import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../contact.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User=new User();
  productForm:FormGroup;
  errorMes:string="Fill correct details";

  constructor(private service:ContactService,private formBuilder:FormBuilder,private dialogref:MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  register(){
    if(this.productForm.valid)
    {
      this.service.registerUser(this.user).subscribe(data=>{
        console.log(data)
        alert("registered successfully")
        this.productForm.reset();
        this.dialogref.close();
      },error=>{console.log(this.user),alert("error")})
    }else
    {
      alert("Fill all details");
      let ele=document.getElementById("error");
      ele.style.display="inline-block";
      
    }

  }

}
