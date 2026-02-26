import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar : MatSnackBar
  ) { }

  openSnackbar(msg : string){
    this._snackbar.open(msg , "close",{
      horizontalPosition : 'center',
      verticalPosition : 'bottom',
      duration : 3000
    })
  }

}
