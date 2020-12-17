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
  constructor(private dataApis: FirestoreService) { }

  ngOnInit() {
    const d1 = new Date(1544102153);

console.log('Fecha:',d1);
    this.getAllClients();
    
  }
   term: string;

  getAllClients(): void {
    this.dataApis.getAllClientes().subscribe(products => {
      this.products = products;
      
    })
  }
  buscar(event){
    this.textoBuscar = event.detail.value;
  }
   
}
