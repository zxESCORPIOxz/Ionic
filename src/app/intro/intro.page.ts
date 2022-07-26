import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit{

  slideOpt = {
    initialSlide: 0, //slide inicial
    slidesPerView: 1, //slide por vista
    centeredSlides: true, //que las slides esten centradas
    speed: 400 //velocidad de transicion de casa slide en milisegundo
  };

  slides = [
    {
      title: 'As It Was',
      subtitle: 'Harry Styles',
      icon: 'musical-notes-outline',
      img: 'assets/images/slide1.jpg',
      // eslint-disable-next-line max-len
      description: 'Pop rock, Funk, R&B contemporáneo, Synth pop, UK Rap, Indian Hip-Hop'
    },
    {
      title: 'In my mind',
      subtitle: 'Dynoro',
      icon: 'musical-note-outline',
      img: 'assets/images/slide2.jpg',
      // eslint-disable-next-line max-len
      description: 'Electrónica, progressive house'
    },
    {
      title: 'TheFatRat',
      subtitle: 'Christian Friedrich',
      icon: 'play-outline',
      img: 'assets/images/slide3.jpeg',
      // eslint-disable-next-line max-len
      description: 'Trap, Dubstep, Electro House o Future'
    },
    {
      title: 'Bad ft.Vassy',
      subtitle: 'David Guetta & Showtek',
      icon: 'radio-outline',
      img: 'assets/images/slide4.jpg',
      // eslint-disable-next-line max-len
      description: 'Pop rock, Funk, R&B contemporáneo, Synth pop, UK Rap, Indian Hip-Hop'
    }
  ];

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit(): void {
  }

  finish() {
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }
}
