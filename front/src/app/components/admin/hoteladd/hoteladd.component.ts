import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/services/hotels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hoteladd',
  templateUrl: './hoteladd.component.html',
  styleUrls: ['./hoteladd.component.scss']
})
export class HoteladdComponent implements OnInit {

  modelData = {
    idUsuario : null,
    nombreHotel : null,
    imagenHotel : null,
    pbxHotel : null,
    paisHotel : null,
    cpHotel : null,
    direccionHotel : null,
    descripcionHotel : null
  };

  constructor(private hotelService: HotelsService) { }

  ngOnInit(): void {
  }

  agregar(){
    this.hotelService.setHotel(this.modelData).subscribe(res => {
      Swal.fire({
        title: 'Añadido',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        window.location.href = "hotel/"+res['data']['hotel']['_id'];
      });
    }, err => console.error(err));
  }

}
