import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usuarios: any = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(res => {
      this.usuarios = res['data'];
      console.log(res);
    }, err => console.error(err));
  }

}
