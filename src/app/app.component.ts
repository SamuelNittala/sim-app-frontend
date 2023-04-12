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
  brocherPage : FormGroup;
  firstFormGroup: FormGroup;
  offerPage:FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup:FormGroup;
  user: any = {};

  errorMessage: string | null = null;

  states = [
    {code: "AN", name: "Andaman and Nicobar Islands"},
    {code: "AP",name: "Andhra Pradesh"},
    {code: "AR",name: "Arunachal Pradesh"},
    {code: "AS",name: "Assam"},
    {code: "BR",name: "Bihar"},
    {code: "CG",name: "Chandigarh"},
    {code: "CH",name: "Chhattisgarh"},
    {code: "DH",name: "Dadra and Nagar Haveli"},
    {code: "DD",name: "Daman and Diu"},
    {code: "DL",name: "Delhi"},
    {code: "GA",name: "Goa"},
    {code: "GJ",name: "Gujarat"},
    {code: "HR",name: "Haryana"},
    {code: "HP",name: "Himachal Pradesh"},
    {code: "JK",name: "Jammu and Kashmir"},
    {code: "JH",name: "Jharkhand"},
    {code: "KA",name: "Karnataka"},
    {code: "KL",name: "Kerala"},
    {code: "LD",name: "Lakshadweep"},
    {code: "MP",name: "Madhya Pradesh"},
    {code: "MH",name: "Maharashtra"},
    {code: "MN",name: "Manipur"},
    {code: "ML",name: "Meghalaya"},
    {code: "MZ",name: "Mizoram"},
    {code: "NL",name: "Nagaland"},
    {code: "OR",name: "Odisha"},
    {code: "PY",name: "Puducherry"},
    {code: "PB",name: "Punjab"},
    {code: "RJ",name: "Rajasthan"},
    {code: "SK",name: "Sikkim"},
    {code: "TN",name: "Tamil Nadu"},
    {code: "TS",name: "Telangana"},
    {code: "TR",name: "Tripura"},
    {code: "UK",name: "Uttarakhand"},
    {code: "UP",name: "Uttar Pradesh"},
    {code: "WB",name: "West Bengal"}
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
      console.log(err)
    }
  }

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    this.brocherPage = this._formBuilder.group({
    });
    this.firstFormGroup = this._formBuilder.group({
      simNumber: ['', Validators.required],
      serviceNumber: ['', Validators.required],
      apiResponseValid: [true, Validators.requiredTrue]
    });
    this.offerPage = this._formBuilder.group({
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
      confirmEmail: ['',Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      idType: ['Aaadhar'],
      idNo: ['', Validators.required],
      state: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.email],
    });
    this.sixthFormGroup = this._formBuilder.group({
      confirm: [false, Validators.requiredTrue]
    });
    this.seventhFormGroup = this._formBuilder.group({});
  }
  onBrochureNextButtonClick(stepper:MatStepper){
    stepper.next();
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

  onOfferNextButtonClick(stepper:MatStepper){
    stepper.next();
  }

  onConfirmNextButtonClick(stepper:MatStepper){
    try{
    if(this.secondFormGroup.value.email==this.thirdFormGroup.value.confirmEmail){
      this.errorMessage = null;
      stepper.next();
    }else{
      this.errorMessage = "Email not matching";
    }
  }catch (err:any){
    console.log(err)
  }
  }

  async onClickIdNextButtonClick(stepper:MatStepper){
    const apiUrl = 'http://localhost:9191/checkId';
    try{
      const data : any = await this.http.post(apiUrl, { idNumber:this.fifthFormGroup.value.idNo,idType:this.fifthFormGroup.value.idType,state:this.fifthFormGroup.value.state,addFirstName:this.fifthFormGroup.value.firstName,addLastName:this.fifthFormGroup.value.lastName,addDateOfBirth:this.fifthFormGroup.value.dob }).toPromise();
    if(data.successSim){
      if(this.secondFormGroup.value.dob==this.fifthFormGroup.value.dob){
          this.errorMessage = null;
          stepper.next();
      }else{
        this.errorMessage = "invalid dob";
      }
    }else{
      this.errorMessage = data.checkAadhaar;
    }
  }catch (err:any){
    console.log(err)
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
