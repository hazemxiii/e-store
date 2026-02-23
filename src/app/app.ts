import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgSlider } from './img-slider/img-slider';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImgSlider, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-store');
}
