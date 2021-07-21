import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-clientheader',
  templateUrl: './clientheader.component.html',
  styleUrls: ['./clientheader.component.scss']
})
export class ClientheaderComponent implements OnInit {

  constructor(private hotelService: HotelsService) { }

  hotel: any = {nombreHotel : ""};

  ngOnInit(): void {

  }

  onkey(event: any){
    this.hotel.nombreHotel = event.target.value;

    /*this.hotelService.searchHotel(this.hotel).subscribe(
      res => {
        
      }, err => console.error(err)
    );*/
  };

}
