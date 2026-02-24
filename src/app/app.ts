import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgSlider } from './img-slider/img-slider';
import { AppSection } from './app-section/app-section';
import { ProductSection } from './product-section/product-section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImgSlider, AppSection, ProductSection],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-store');
}
