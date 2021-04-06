import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';
import {ProductService} from '../product.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform;
message;
registerform;
constructor(private productservice:ProductService,private router:Router) { 
  this.loginform = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    travels:new FormControl()
   
    
  })

  this.registerform = new FormGroup({
    name : new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    confirmpassword: new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    travels: new FormControl()
 })
}

  ngOnInit(): void {
  }

  processdata()
  {
    if(this.loginform.valid)
    console.log(this.loginform.value)
    this.productservice.loginUser(this.loginform.value).subscribe((data)=>{
      console.log(data)
      this.message = data.message
      this.toastmessage();
console.log(data.status)
      if(data.status ==200)
      {
        this.message = "login success"
      this.toastmessage();
      console.log("logged in")
      localStorage.setItem('name', data.name);
      localStorage.setItem('email',data.email);
      localStorage.setItem('jwtToken',data.jwttoken)
      localStorage.setItem('isTravels',this.loginform.value.travels)
      localStorage.setItem('uniqueid',data.uniqueid)
      localStorage.setItem('accstatus',data.accstatus)
      
      this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
      }
      else
      {
      console.log("failed")
      this.message = "Incorrect username or password"
      this.toastmessage();
      }

    })
  }
  toastmessage() {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  processdata_reg()
  {
    if(this.registerform.valid){
    console.log(this.registerform.value)
    if(this.registerform.value.travels ==true)
    {
      this.registerform.value.accstatus ="pending"
    }
    this.productservice.registerUser(this.registerform.value).subscribe((data)=>{
      console.log(data)
      this.router.navigate(['login'])

    })
  }
  }


}
