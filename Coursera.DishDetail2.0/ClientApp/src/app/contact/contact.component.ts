import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { ContactType } from '../shared/contactType';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
/** contact component*/
export class ContactComponent implements OnInit {
/** contact ctor */
  feedBackForm: FormGroup;
  feedBack: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirtective;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit() {

  }
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  createForm(): void {
    console.log('creating form');
    this.feedBackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedBackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedBackForm) { return; }
    const form = this.feedBackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    console.log(this.feedBackForm.get("firstName").value);
    console.log(this.feedBackForm.get("firstName").status);
    console.log(this.feedBackForm.get("firstName").pristine);
    console.log(this.feedBackForm.get("firstName").dirty);
    console.log(this.feedBackForm.get("firstName").untouched);
    console.log(this.feedBackForm.get("firstName").touched);
    console.log(this.feedBackForm.get("telNum").hasError("required"));
    this.feedBack = this.feedBackForm.value;
    console.log(this.feedBack);
    this.feedBackForm.reset({
      firstName: '', 
      lastName: '', 
      telNum: 0, 
      email: '', 
      agree: false,
      contactType: 'none',
      message: ''
    });
    this.feedbackFormDirtective.resetForm();
  }
}
