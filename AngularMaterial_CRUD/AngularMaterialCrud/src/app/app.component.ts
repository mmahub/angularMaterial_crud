import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { DialogComponent } from "./dialog/dialog.component";
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularMaterialCrud';

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;    //this will provide pagination to our dataTable
  @ViewChild(MatSort) sort!: MatSort;       //this will provide sorting to our dataTable

  constructor(private dialog: MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {            //this will open a dialog component as a dialog box
    this.dialog.open(DialogComponent, {
      width:'30%'
    })
    .afterClosed().subscribe(val=>{   //this will help us to refresh the product list page after adding the product;
      if (val ==='save') {          //this 'save' value we r checking because we have send that value at the time of addingTheProduct; for refrence:- 'dialog.component.ts' files line no.57
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator ;
          this.dataSource.sort = this.sort ;
        },
        error: (err) => {
          alert("Error While fetching records!!");
        }
      })
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    })
    .afterClosed().subscribe(val=> {    //this will help in refreshing the page after update
      if (val === 'update') {         //this 'update' value we r checking because we have send that value at the time of updatingTheProduct; for refrence:- 'dialog.component.ts' files line no.76
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id: number){
    this.api.deleteProduct(id)
    .subscribe({
      next: (res) => {
        alert("Product Deleted successfully.");
        this.getAllProducts();    //this will refresh the page and remove the deleted item from the table
      },
      error: () => {
        alert("Error while deleting the product!!");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
