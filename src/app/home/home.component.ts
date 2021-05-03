import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formvisitcount;
  sitevisitcount;
  startvisitcount;
  userdata=[];
  displayArr=[];
  currentData;
  exportarr=[];
  sortedarr=[];

  constructor(private productservice: ProductService,private router:Router) {
    if(localStorage.getItem("jwtToken")==null)
    {
      this.router.navigate(['login'])
    }
    else{
    this.productservice.getalldata({dummyval:"dummyval"}).subscribe((data) => {
      console.log(data)
      console.log(data.data)
      this.formvisitcount=data.data.formvisitcount;
      this.sitevisitcount=data.data.sitevisitcount;
      this.startvisitcount=data.data.startvisitcount;
      this.userdata=data.data.userData;
      this.userdata=this.userdata.filter((elem)=>{
        return elem.status!="removed";
      })
      this.displayArr=this.userdata;
    
      this.sortedarr=this.userdata;
    })
  }

   }


download(){
  if(this.exportarr.length==0){
    this.exportarr=this.userdata
  }
  
  this.productservice.downloadFile(this.exportarr, 'kucchi');
}

  ngOnInit(): void {
  }

  showalldata(details){
    console.log(details)
    this.currentData=details
  }

  toggleanswer(smName) {
    if (!this.exportarr.includes(smName)) {
      this.exportarr.push(smName)
    }
    else if (this.exportarr.includes(smName)) {
      this.exportarr = this.exportarr.filter(item => item !== smName)
    }
    console.log(this.exportarr)
  }

  sortbytimelowtoup(){
    this.displayArr.sort(function(a,b){
      return (a.time) -(b.time)
    })
    this.sortedarr=this.displayArr;
  }

  sortbytimeuptolow(){
    this.displayArr.sort(function(a,b){
      return (b.time) -(a.time)
    })
    this.sortedarr=this.displayArr;

  }

  search(searchstr){
  

  this.displayArr= this.sortedarr.filter((item)=>item.name.toLowerCase().includes(searchstr.toLowerCase())||item.email.toLowerCase().includes(searchstr.toLowerCase()))
    

  }

  logoutuser()
  {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem("isTravels");
    
    this.router.navigate([''])
    location.reload();
    


  }
  deleteValue(){
    console.log(this.currentData)
    this.productservice.removeData(this.currentData).subscribe((data) => {
      console.log(data)
      window.location.reload();
    })

  }


}
