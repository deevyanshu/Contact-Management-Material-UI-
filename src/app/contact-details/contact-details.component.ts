import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
contact:Contact=new Contact();


  constructor(private service:ContactService,@Inject(MAT_DIALOG_DATA)private cid:number) { }

  ngOnInit(): void {
    this.service.getContact(this.cid).subscribe(data=>{
      this.contact=data;
    })
  }

}
