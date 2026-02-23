import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.html',
  styleUrls: ['./img-slider.css'],
  standalone: true,
})
export class ImgSlider {
  images: string[] = [
    'https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/thumbnail.png',
    'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png',
    'https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Oval%20Earring/thumbnail.png',
  ];
  activeImage: string = this.images[0];
  activeImageIndex: number = 0;

  constructor(private cd: ChangeDetectorRef) {
    setInterval(() => {
      this.nextImage();
      this.cd.detectChanges();
    }, 1000);
  }

  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
    this.activeImage = this.images[this.activeImageIndex];
  }
  prevImage() {
    this.activeImageIndex = this.activeImageIndex - 1;
    if (this.activeImageIndex < 0) {
      this.activeImageIndex = this.images.length - 1;
    }
    this.activeImage = this.images[this.activeImageIndex];
  }
}
