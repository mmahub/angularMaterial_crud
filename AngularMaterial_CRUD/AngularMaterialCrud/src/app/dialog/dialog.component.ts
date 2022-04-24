import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn: string = 'Save';   //initially the button value will be 'save'

  constructor(private formBuilder: FormBuilder, 
              private api:ApiService, 
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any   //this will help us in prefilling the form on edit button.
              ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required], 
    })

    //console.log(this.editData);   //this 'this.editdata' will hold all the row data (used in edit button)
    if (this.editData) {
      this.actionBtn = "Update"   //when user click on edit button the AddProductForm button value will be 'update'
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if (!this.editData) {   //if this is not an editform then only post the data; else update the data.
      if (this.productForm.valid) {
        // console.log(this.productForm.value);
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: () => {
              alert("Product Added Successfully");
              this.productForm.reset();   //this will reset form after saving the data.
              this.dialogRef.close('save');     //this will close the dialogBox after saving the data; and its value 'save' will use for refreshing the page
            },
            error: () => {
              alert("Error While Adding Product");
            }
          })
      }
    }
    else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Product updated successfully.");
        this.productForm.reset();   //this will reset the form after update
        this.dialogRef.close('update');   //this will close the dialog form after update.
      },
      error: () => {
        alert("Error while updating the record!!");
      }
    })
  }
}
