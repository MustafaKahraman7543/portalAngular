import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor (private formBuilder:FormBuilder,
                private authService:AuthService,
                  private router:Router){}

  ngOnInit():void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]

    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel=Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>
          {
           console.log(response.accessToken.token);
           localStorage.setItem("token",response.accessToken.token);
           this.router.navigate(["agenda"])
          },responseError=>{console.log(responseError.error.Failures ?
              responseError.error.Failures.forEach((failure: any) => 
                {console.log(failure.ErrorMessage)}):responseError.error.Detail)}
      )
    }
  }
}
