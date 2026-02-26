import { Injectable } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  patchValueInForm(skills: any, skillsArr: FormArray<any>) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  patchValue(dataArr : Array<any> , formArray : FormArray){
    formArray.clear()
      dataArr.forEach(data => {
        let control = new FormControl(data,[Validators.required])
        formArray.push(control)
      })
  }

}
