import { Component, HostListener, OnInit } from '@angular/core';
import 'fabric';

declare const fabric: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private canvas: any;
  private screenHeight: number;
  private screenWidth: number;

  constructor() {
    this.onResize();
  }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      backgroundColor: 'white'
    });

    this.resizeCanvas();
    this.drawBoundingBox();

    this.addRectangle();
  }

  private drawBoundingBox() {
    const borderTop = 150;
    const borderLeft = 150;
    this.canvas.add(new fabric.Line([borderTop, borderLeft, borderTop, this.canvas.getHeight() - borderLeft], {
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false
    }));

    this.canvas.add(new fabric.Line([this.canvas.getWidth() - borderTop, borderLeft, this.canvas.getWidth() - borderTop, this.canvas.getHeight() - borderLeft], {
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false
    }));

    this.canvas.add(new fabric.Line([borderTop, borderLeft, this.canvas.getWidth() - borderTop, borderLeft], {
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false
    }));

    this.canvas.add(new fabric.Line([borderTop, this.canvas.getHeight() - borderLeft, this.canvas.getWidth() - borderTop, this.canvas.getHeight() - borderLeft], {
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false
    }));
  }

  private resizeCanvas() {
    this.canvas.setWidth((this.screenWidth / 100) * 80);
    this.canvas.setHeight((this.screenHeight / 100) * 95);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.canvas) {
      this.resizeCanvas();
    }
  }

  addRectangle() {
    this.canvas.add(new fabric.Rect({
      width: 200, height: 100, left: 10, top: 10, angle: 0,
      fill: '#3f51b5'
    }));
  }
}
