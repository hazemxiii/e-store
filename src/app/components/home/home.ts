import { Component } from '@angular/core';
import { ImgSlider } from '../../img-slider/img-slider';
import { AppSection } from '../../app-section/app-section';
import { ProductSection } from '../../product-section/product-section';

@Component({
  selector: 'app-home',
  imports: [ImgSlider, AppSection, ProductSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
