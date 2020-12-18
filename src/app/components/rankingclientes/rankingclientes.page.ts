import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Cliente } from 'src/app/shared/client.interface';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-rankingclientes',
  templateUrl: './rankingclientes.page.html',
  styleUrls: ['./rankingclientes.page.scss'],
  providers: [DatePipe],
})
export class RankingclientesPage implements OnInit {
  public products = Array<Cliente>();
  textoBuscar: '';
  term: string;
  public sales: any [];
  public salesid: any [];

  constructor(private dataApis: FirestoreService) { 
     this.sales=[ {id:1,name:"Ventas mayores a 10"},{id:2,name:"Ventas mayores a 50"},{id:3,name:"Ventas mayores a 100"} ];
     this.salesid=[ {id:1},{id:2},{id:3} ];

  }
  
  ngOnInit() {
    this.getAllClients();
  }

  getAllClients(): void {
    this.dataApis.getAllClientes().subscribe(products => {
      this.products = products;      
    });
    this.products == this.getSales();  

  }
  getSales(){
    return this.products.filter((produc) =>{
      return produc.nombre == "brami";
    });
  }
  buscar(event){
    this.textoBuscar = event.detail.value;
  }
 onChange(SelectedValue){
   return this.products.filter((produc) =>{
      return produc.nombre == SelectedValue;
  })
  //  console.log("Selected car", SelectedValue); 
 } 
}
  