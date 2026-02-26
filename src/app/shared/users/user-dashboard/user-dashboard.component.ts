import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/user';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  usersArray : Array<Iuser> = []

  constructor(
    private _userService : UsersService
  ) { }

  ngOnInit(): void {
    this._userService.fetchAllUsers().subscribe({
      next : data => {
        console.log(data);
        this.usersArray = data
        
      }
    })
  }


  trackById(index : number,user : Iuser){
    return user.userId
  }

}
