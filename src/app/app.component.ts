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

  private drawBoundingBox(): void {
    const borderTop = 150; // hardcoded values for demo purposes
    const borderLeft = 150; // hardcoded values for demo purposes
    this.canvas.add(new fabric.Line([borderTop, borderLeft, borderTop, this.canvas.getHeight() - borderLeft], {
      name: 'border-left',
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false
    }));

    this.canvas.add(
      new fabric.Line(
        [this.canvas.getWidth() - borderTop, borderLeft, this.canvas.getWidth() - borderTop, this.canvas.getHeight() - borderLeft], {
          name: 'border-right',
          strokeDashArray: [5, 5],
          stroke: 'red',
          selectable: false
        }));

    this.canvas.add(new fabric.Line([borderTop, borderLeft, this.canvas.getWidth() - borderTop, borderLeft], {
      name: 'border-top',
      strokeDashArray: [5, 5],
      stroke: 'red',
      selectable: false
    }));

    this.canvas.add(
      new fabric.Line(
        [borderTop, this.canvas.getHeight() - borderLeft, this.canvas.getWidth() - borderTop, this.canvas.getHeight() - borderLeft], {
          name: 'border-bottom',
          strokeDashArray: [5, 5],
          stroke: 'red',
          selectable: false
        }));
  }

  private resizeCanvas(): void {
    this.canvas.setWidth((this.screenWidth / 100) * 80);
    this.canvas.setHeight((this.screenHeight / 100) * 95);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.canvas) {
      this.resizeCanvas();
      this.removeBoundingBox();
      this.drawBoundingBox();
    }
  }

  private removeBoundingBox(): void {
    this.canvas.getObjects('line').forEach(line => {
      this.canvas.remove(line);
    });
  }

  addRectangle(): void {
    this.canvas.add(new fabric.Rect({
      width: 200, height: 100, left: 10, top: 10, angle: 0,
      fill: '#3f51b5'
    }));
  }
}
