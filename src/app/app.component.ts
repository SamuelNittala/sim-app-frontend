import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  user: any = {};

  states = [
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Arunachal Pradesh', code: 'AR' },
    { name: 'Assam', code: 'AS' },
  ];

  submit() {
    this.user = {
      simNumber: this.firstFormGroup.value.simNumber,
      serviceNumber: this.firstFormGroup.value.serviceNumber,
      email: this.secondFormGroup.value.email,
      dob: this.secondFormGroup.value.dob,
      title: this.thirdFormGroup.value.title,
      firstName: this.thirdFormGroup.value.firstName,
      lastName: this.thirdFormGroup.value.lastName,
      idType: this.fourthFormGroup.value.idType,
      state: this.fourthFormGroup.value.state,
      idNumber: this.fourthFormGroup.value.idNumber,
      addressFirstName: this.fourthFormGroup.value.firstName,
      addressLastName: this.fourthFormGroup.value.lastName,
      addressDob: this.fourthFormGroup.value.dob,
      addressEmail: this.fourthFormGroup.value.email,
    };
  }

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    this.firstFormGroup = this._formBuilder.group({
      simNumber: ['', Validators.required],
      serviceNumber: ['', Validators.required],
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
      email: ['', Validators.email],
    });
    this.fourthFormGroup = this._formBuilder.group({
      idType: ['Aaadhar'],
      idNo: ['', Validators.required],
      state: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.email],
    });
    this.fifthFormGroup = this._formBuilder.group({});
  }

  callApi() {
    const apiUrl = 'https://swapi.dev/api/people/1/';
    this.http.get(apiUrl).subscribe(
      (data) => {
        console.log('API Response: ', data);
      },
      (error) => {
        console.error('API Error: ', error);
      }
    );
  }
}
