import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'

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

  constructor(private productservice: ProductService) {
    this.productservice.getalldata({dummyval:"dummyval"}).subscribe((data) => {
      console.log(data)
      console.log(data.data)
      this.formvisitcount=data.data.formvisitcount;
      this.sitevisitcount=data.data.sitevisitcount;
      this.startvisitcount=data.data.startvisitcount;
      this.userdata=data.data.userData;
    })
   }


download(){
  this.productservice.downloadFile(this.userdata, 'craetorsinc');
}

  ngOnInit(): void {
  }

}
