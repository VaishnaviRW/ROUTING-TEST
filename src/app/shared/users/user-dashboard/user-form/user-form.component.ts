import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { country } from 'src/app/shared/const/country';
import { Iuser } from 'src/app/shared/models/user';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { UsersService } from 'src/app/shared/service/users.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  countryArr = country

  userForm !: FormGroup
  userId !: string
  isInEditMode : boolean = false

  constructor(
    private _userService : UsersService,
    private _router : Router,
    private _routes : ActivatedRoute,
    private _utility : UtilityService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addressControl()
    this.addSkills()
    this.patchData()
  }

  trackById(index : number, user : Iuser){
    return user.userId
  }

  createUserForm(){
    this.userForm = new FormGroup({
      userName : new FormControl(null,[Validators.required]),
      userId : new FormControl(null,[Validators.required]),
      userRole : new FormControl(null,[Validators.required]),
      profileDescription : new FormControl(null,[Validators.required]),
      profileImage : new FormControl(null,[Validators.required]),
      experienceYears : new FormControl(null,[Validators.required]),
      skills : new FormArray([new FormControl(null,[Validators.required])]),
      isActive : new FormControl(null,[Validators.required]),
      address : new FormGroup({
        current : new FormGroup({
          country : new FormControl('India',[Validators.required]),
          state : new FormControl(null,[Validators.required]),
          city : new FormControl(null,[Validators.required]),
          zipcode : new FormControl(null,[Validators.required]),
        }),
        permanent : new FormGroup({
          country : new FormControl('India',[Validators.required]),
          state : new FormControl(null,[Validators.required]),
          city : new FormControl(null,[Validators.required]),
          zipcode : new FormControl(null,[Validators.required]),
        })
      }),
      isAddressSame : new FormControl({value : null, disabled : true},[Validators.required])
    })
  }


  addressControl(){
    this.controls['address'].get('current')?.valueChanges.subscribe(res => {
      if(this.controls['address'].get('current')?.valid){
        this.controls['isAddressSame'].enable({emitEvent : false})
      }else{
        this.controls['isAddressSame'].disable({emitEvent : false})
        this.controls['isAddressSame'].reset()
      }
    })

    this.controls['isAddressSame'].valueChanges.subscribe(res => {
      if(res){
        let current = this.controls['address'].get('current')?.value
        this.controls['address'].get('permanent')?.patchValue(current)
        this.controls['address'].get('permanent')?.disable({emitEvent : false})
      }else{
        this.controls['address'].get('permanent')?.enable({emitEvent : false})
        this.controls['address'].get('permanent')?.reset()
      }
    })
  }


  addSkills(){
    let skillControl = new FormControl(null,[Validators.required])
    this.skillsArr.push(skillControl)
  }

  get controls(){
    return this.userForm.controls
  }

  get skillsArr(){
    return this.controls['skills'] as FormArray
  }



  onSkillsRemove(i : number){
    this.skillsArr.removeAt(i)
  }

  onUsersAdd(){
      let obj = this.userForm.getRawValue()
      console.log(obj);
      
      this._userService.createUserForm(obj).subscribe({
        next : data => {
          console.log(data);
          this._snackbar.openSnackbar(`Added successfully!!!`)
          this._router.navigate(['users'])
        }
      })
    }



    patchData(){
      this.userId = this._routes.snapshot.params['userId']

      if(this.userId){
        this.isInEditMode = true;

        this._userService.fetchSingleUserId(this.userId).subscribe({
          next : data => {
            this.userForm.patchValue(data)
            this._utility.patchValueInForm(data.skills,this.skillsArr)
          }
        })
      }else{
        this.isInEditMode = false
      }
    }


    onUpdate(){
      let obj : Iuser = {
        ...this.userForm.value,
        userId : this.userId
      }
      console.log(obj);

      this._userService.updateUser(obj).subscribe({
        next : data => {
          console.log(data);

          this.isInEditMode = false

          this._snackbar.openSnackbar(`Updated successfully!!!`)

          this._router.navigate(['users'])

          this.userForm.reset()
        },
        error : err => {
          console.log(err)
        }
      })
      
    }



  }





