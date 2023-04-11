import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  user: any = {};

  errorMessage: string | null = null;

  states = [
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Arunachal Pradesh', code: 'AR' },
    { name: 'Assam', code: 'AS' },
  ];

  titles = [
    {name:'mr.' , code: 'male'},
    {name:'mrs.', code:'female'}
  ];

  async onSubmit(stepper:any) {
    const apiUrl = 'http://localhost:9191/addAll';
    this.user = {
      simNumber: this.firstFormGroup.value.simNumber,
      serviceNumber: this.firstFormGroup.value.serviceNumber,
      email: this.secondFormGroup.value.email,
      dateOfBirth: this.secondFormGroup.value.dob,
      title: this.thirdFormGroup.value.title,
      firstName: this.thirdFormGroup.value.firstName,
      lastName: this.thirdFormGroup.value.lastName,
      idType: this.fourthFormGroup.value.idType,
      state: this.fourthFormGroup.value.state,
      idNumber: this.fourthFormGroup.value.idNumber,
      address: this.fourthFormGroup.value.address,
      city: this.fourthFormGroup.value.city,
      pincode: this.fourthFormGroup.value.pincode,
      addressFirstName: this.fourthFormGroup.value.firstName,
      addressLastName: this.fourthFormGroup.value.lastName,
      addressDateOfBirth: this.fourthFormGroup.value.dob,
      addressEmail: this.fourthFormGroup.value.email,
    };
    try{
      const data : any = await this.http.post(apiUrl,this.user).toPromise();
      if(!data.success){
        this.errorMessage = "verification failed";
      }else{
        this.errorMessage = null;
        stepper.next();
      }
    }catch(err:any){

    }
  }

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    this.firstFormGroup = this._formBuilder.group({
      simNumber: ['', Validators.required],
      serviceNumber: ['', Validators.required],
      apiResponseValid: [true, Validators.requiredTrue]
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', Validators.email],
      dob: ['', Validators.required],
      confirm: [false, Validators.requiredTrue],
    });
    this.thirdFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
    });
    this.fourthFormGroup = this._formBuilder.group({
      idType: ['Aaadhar'],
      idNo: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.email],
    });
    this.fifthFormGroup = this._formBuilder.group({});
    this.sixthFormGroup = this._formBuilder.group({});
  }

  onFirstStepNextButtonClick(stepper: MatStepper) {
    if (this.firstFormGroup.valid) {
      this.callApi(stepper);
    }
  }

  onSecondStepNextButtonClick(stepper: MatStepper){
    if(this.secondFormGroup.valid){
      this.verifyEmail(stepper);
    }
  }
  

  async callApi(stepper: MatStepper) {
    const apiUrl = 'http://localhost:9191/verify';
    try {
      const data : any = await this.http.post(apiUrl, { simNumber: this.firstFormGroup.value.simNumber, serviceNumber: this.firstFormGroup.value.serviceNumber }).toPromise();
      if (data.checkSim) {
        this.errorMessage = data.checkSim;
      } else {
        this.errorMessage = null;
        stepper.next();
      }
    } catch (err : any) {
      console.log(err)
    }
  }

  async verifyEmail(stepper:MatStepper){
    const apiurl = 'http://localhost:9191/verify/Email';

    try{
      const data : any = await this.http.post(apiurl,{email: this.secondFormGroup.value.email,dateOfBirth:this.secondFormGroup.value.dateOfBirth}).toPromise();
      if(data.checkMail){
        this.errorMessage = data.checkMail;
      }else{
        this.errorMessage = null;
        stepper.next();
      }
    }catch (err:any){
      console.log(err);
    }
  }
}
