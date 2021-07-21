import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hoteles: any;

  constructor(private hotelServices: HotelsService) { }

  ngOnInit(): void {
    this.hotelServices.getHotels().subscribe(res => {
      this.hoteles = res['data'];
    }, err => console.log(err));
  }

}
