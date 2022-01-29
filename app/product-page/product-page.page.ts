import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {


  slides = [
    
    {
      img: 'assets/Shoes/Nike/n3.jpg',

    },
    {
      img: 'assets/Shoes/Nike/n3a.jpg',

    },
    {
      img: 'assets/Shoes/Nike/n3s.jpg',

    }
  ];

  asgards = [
    
    {
      ttpi: 'assets/Shoes/Nike/n3.jpg',

    },
    {
      ttpi: 'assets/Shoes/Nike/n3a.jpg',

    }

  ];




  constructor() { }

  ngOnInit() {
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
}
