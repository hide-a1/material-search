import { Component, Input, OnInit } from '@angular/core';
import { Material } from 'functions/interfaces/material';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() material!: Material;

  constructor() {}

  ngOnInit(): void {}
}
