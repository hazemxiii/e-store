import { Component, effect } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SliderImageContainer } from '../models/slider-image-container';
import { CustomBtn } from '../custom-btn/custom-btn';
import { RouterLink } from '@angular/router';
import { Theme } from '../services/theme';

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.html',
  styleUrls: ['./img-slider.css'],
  imports: [CustomBtn, RouterLink],
  standalone: true,
})
export class ImgSlider {
  images: SliderImageContainer[] = [
    new SliderImageContainer('Home Collection', 'Curated Living', 'Shop now', 'assets/hero-1.jpg'),
    new SliderImageContainer('Spring / Summer 2026', 'New Season', 'Explore', 'assets/hero-2.jpg'),
    new SliderImageContainer(
      'Skincare Essentials',
      'Natural Beauty',
      'Discover',
      'assets/hero-3.jpg',
    ),
  ];
  activeImageIndex: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
    public theme: Theme,
  ) {
    setInterval(() => {
      this.nextImage();
      this.cd.detectChanges();
    }, 3000);
    effect(() => {
      document.body.classList.toggle('dark', this.theme.theme() === 'dark');
      localStorage.setItem('theme', this.theme.theme());
    });
  }

  toggle() {
    this.theme.toggleTheme();
  }

  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
    // this.activeImage = this.images[this.activeImageIndex];
  }
  prevImage() {
    this.activeImageIndex = this.activeImageIndex - 1;
    if (this.activeImageIndex < 0) {
      this.activeImageIndex = this.images.length - 1;
    }
    // this.activeImage = this.images[this.activeImageIndex];
  }
}
