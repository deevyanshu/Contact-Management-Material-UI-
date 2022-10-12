import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { Contact } from '../contact';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user:string;
dataSource: MatTableDataSource<Contact>;
displayedColumns: string[] = ['cid', 'name', 'phone','action'];

@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service:ContactService,private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    if(this.service.isUserLoggedIn())
    {
      this.user=this.service.getLoggedInUserName();
      this.getAllContacts();
    
    }else
    {
      this.router.navigate([""]);
    }
    
  }

  getAllContacts(){
    return this.service.getAllContacts().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },error=>console.log("error"))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(cid:number){
    this.dialog.open(AddContactComponent,{
      width:"50%",
      data:cid
    }).afterClosed().subscribe(val=>{
      this.getAllContacts();
    })
  }

  delete(cid:number)
  {
    return this.service.deleteContact(cid).subscribe(data=>{
      alert("contact deleted");
      this.getAllContacts();
      
    })
  }

  openDetails(cid:number){
    this.dialog.open(ContactDetailsComponent,{
      width:"50%",
      data:cid
    })
  }
}
