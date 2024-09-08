import { Component, OnInit } from '@angular/core'; //here
import { FormArray, FormControl, FormControlName, FormGroup, FormGroupName, Validators } from '@angular/forms'; //here from reactiveForm

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // after implements a mwae sat khan trr
  // title = 'reactive-form';

  genders = ['Male', 'Female', 'Not Mentioned'];

  signupForm!: FormGroup;

  forbiddenUserName = ['yoyo', 'Chris'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]), //function name yee
        email: new FormControl(null, [Validators.email, Validators.required]),
      }),
      gender: new FormControl('Male'),
      hobbies: new FormArray([]),
      habbits: new FormArray([]),
    });
  }

  // ngOnInit(): void {
  //   this.signupForm = new FormGroupName ({
  //     userData: new FormGroup ({
  //       'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
  //       'email': new FormControl(null, [Validators.email, Validators.required]),
  //     }),
  //     'gender': new FormControl('Male'),
  //     'hobbies': new FormControl([]),
  //     'habbits': new FormControl([]),
  //   })
  // }

  // onSubmit() {
  //   console.log(this.signupForm)
  // }

  // ngOnInit(): void {
  //   this.signupForm = new FormGroup ({
  //     userData: new FormGroup ({
  //       'username': new FormControl(null, Validators.required),
  //       'email': new FormControl(null, [Validators.email, Validators.required]),
  //     }),
  //     'gender': new FormControl('Male'),
  //     'hobbies': new FormArray ([]),
  //   })
  // }

  submitted = false;

  user = {
    username: '',
    email: '',
    gender: '',
    hobbie: ''
  };

  onSubmit() {
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.hobbie = this.signupForm.value.hobbies;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  getControlsHabbits() {
    return (<FormArray>this.signupForm.get('habbits')).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onAddHabbit() {
    const habbit = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('habbits')).push(habbit);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (control.value && this.forbiddenUserName.indexOf(control.value) != -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
}
