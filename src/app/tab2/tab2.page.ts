import { Component } from '@angular/core';
import { User } from '../interfaces';
import { FirebaseService } from '../services/firebase.service';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public photos: Photo[] = [];
  ages: number[];
  users: User[];
  public userAux: User[] = [
    {
      name: 'erick',
      lastname: 'gonzalez',
      proffesion: 'developer',
      age: 5,
      level: 1,
    },
  ];
  constructor(
    public photoService: PhotoService,
    public firebaseService: FirebaseService
  ) {}
  async ngOnInit() {
    await this.photoService.loadSaved();
    console.log('hello world from tab2');
    const path = 'users/';
    // this.firebaseService.getDoc<User>(path).subscribe((res: User) => {
    //   console.log('name of ', res.name);
    //   this.users[0] = res;
    //   this.userAux[0] = res;
    // });
    this.firebaseService.getCollection<User>(path).subscribe((res) => {
      // console.log('name of ', res.name);
      // this.users[0] = res;
      this.userAux = res;
      // console.log('name of ', this.userAux[0].name);
      // console.log('what is this: ', res);
    });
  }
  initUsers() {
    this.ages = [5, 20, 12];
    this.users = [
      {
        name: 'Erick',
        lastname: 'Gonzalez',
        proffesion: 'Developer',
        age: 5,
        level: 1,
      },
      {
        name: 'Kio',
        lastname: 'Kusanagi',
        proffesion: 'Developer',
        age: 20,
        level: 2,
      },
    ];
  }

  saveUser() {
    //it's posible to handle only refers "impar"
    // const path = 'users/asdfasd/product';
    const path = 'users/';
    const newUser: User = {
      name: 'Erick',
      lastname: 'Gonzalez',
      proffesion: 'Developer',
      age: 5,
      level: 1,
      id: this.firebaseService.createIdDoc(),
    };

    this.firebaseService
      .createDoc<User>(newUser, path, newUser.id)
      .then((res) => {
        console.log('res of firebase', res);
      })
      .catch((err) => {
        console.log('err of firebase', err);
      });
  }
  deleteUser(id: string) {
    this.firebaseService.deleteDoc('users/', id).then((res) => {
      console.log('res of delete', res);
    });
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
    this.photos = this.photoService.photos;
  }
}
export interface Photo {
  filepath: string;
  webviewPath: string;
}
