import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  title:string="Add Contact here";
  actionBtn:string="Add";
  contact:Contact=new Contact();
  productForm:FormGroup;

  constructor(private service:ContactService,private formbuilder:FormBuilder,private dialogref:MatDialogRef<AddContactComponent>,@Inject(MAT_DIALOG_DATA)private cid:number) { }

  ngOnInit(): void {
    this.productForm=this.formbuilder.group({
      name:['',Validators.required],
      phone:['',Validators.required]
    });
    if(this.cid)
    {
      this.title="Update Contact Here";
      this.actionBtn="Update";
      this.service.getContact(this.cid).subscribe(data=>{
        this.contact=data;
      })
    }
  }

  add(){
    if(!this.cid)
    {
      this.service.addContact(this.contact).subscribe(data=>{
        alert("contact added successfully");
        this.productForm.reset();
        this.dialogref.close();
      });
    }else
    {
      this.update();
    }
    
  }

  update(){
    this.service.updateContact(this.contact,this.cid).subscribe(data=>{
      this.productForm.reset();
        this.dialogref.close();
      alert("Contact updated successfully");
    })
  }


}
