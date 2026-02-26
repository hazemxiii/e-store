import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Footer],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}
