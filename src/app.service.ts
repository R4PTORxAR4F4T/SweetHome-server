import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private userData = [

    {
      "username": "ontor",
      "password": "ontor123"
    },
    {
      "username": "arafat",
      "password": "arafat123"
    },
    {
      "username": "rajib",
      "password": "rajibt123"
    }

  ];
  
  

  getHome(): string {
    return 'Home page';
  }

  getAbout(): string {
    return 'About page';
  }

  postContact(): Record<string, string> {
    // Example logic for processing contact details
    return {
      name: 'Arafat',
      email: 'example@gmail.com',
      message: 'Here is the message',
    };
  }

  addNewUser(data){
    this.userData.push(data);
    return data;
  }  

  allUser() : any {
    return this.userData;
  }

  userInfo(name) : any{
    return this.userData.find((data)=> data.username == name ) || {message : "not found"};
  }

}
