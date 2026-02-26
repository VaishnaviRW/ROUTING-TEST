import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/service/users.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.scss']
})
export class UserCardsComponent implements OnInit {

  userId !: string
  users !: Iuser

  constructor(
    private _userService : UsersService,
    private _router : Router,
    private _routes : ActivatedRoute,
    private _dialog : MatDialog,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.fetSingle()
  }

  fetSingle(){
    this.userId = this._routes.snapshot.params['userId']

    this._userService.fetchSingleUserId(this.userId).subscribe({
      next : data => {
        console.log(data);
        this.users = data
      }
    })
  }


  onRemove(){
    let matConfig = new MatDialogConfig()
    matConfig.data = `Are you sure to remove this card?`
    matConfig.width = "500px"

    let matRef = this._dialog.open(GetConfirmComponent,matConfig)
    matRef.afterClosed().pipe(
      filter(Boolean),
        switchMap(() => {
          return this._userService.removeUser(this.userId)
        })
      
    ).subscribe({
      next : data => {
        this._snackbar.openSnackbar(`Removed successfully!!!`)
        this._router.navigate(['users'])
      }
    })
  }




}
