import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  /* ===============================
     VIDEO BACKGROUND
     =============================== */

  @ViewChild('backgroundVideo')
  backgroundVideo!: ElementRef<HTMLVideoElement>;

  videos: string[] = [
    'videos/Cinematic_Dream_Travel_Commercial.mp4',
    'videos/WhatsApp Video 2025-12-12 at 19.22.59.mp4'
  ];

  currentVideoIndex = 0;
  currentVideo = this.videos[0];

  ngAfterViewInit() {
    this.playSafe();
    this.startSmoothScroll(this.carouselInt?.nativeElement);
    this.startSmoothScroll(this.carouselNac?.nativeElement);
  }

  onVideoEnded() {
    this.currentVideoIndex =
      (this.currentVideoIndex + 1) % this.videos.length;

    this.currentVideo = this.videos[this.currentVideoIndex];
    setTimeout(() => this.playSafe(), 50);
  }

  playSafe() {
    const video = this.backgroundVideo?.nativeElement;
    if (!video) return;

    video.muted = this.isMuted;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setTimeout(() => video.play(), 200);
      });
    }
  }

  /* ===============================
     PLANEJADOR DE ORÇAMENTO
     =============================== */

  budget: number = 5000;
  selectedDestinationKey: string = 'roma';
  budgetResult: any = null;

  destinationsData: any = {
    tokyo: { name: 'Tóquio', dailyCost: 800, flight: 4500 },
    maldivas: { name: 'Maldivas', dailyCost: 1500, flight: 6000 },
    paris: { name: 'Paris', dailyCost: 700, flight: 3800 },
    roma: { name: 'Roma', dailyCost: 650, flight: 3900 },
    santorini: { name: 'Santorini', dailyCost: 900, flight: 4200 }
  };

  calculateBudget() {
    const dest =
      this.destinationsData[this.selectedDestinationKey] ||
      this.destinationsData['roma'];

    const days = 7;
    const totalCost = dest.flight + dest.dailyCost * days;
    const difference = this.budget - totalCost;

    this.budgetResult = {
      destination: dest.name,
      totalCost,
      isPossible: difference >= 0,
      difference: Math.abs(difference)
    };
  }

  /* ===============================
     MODAL
     =============================== */

  selectedDetail: any = null;

  detailsDatabase: any = {
    roma: {
      title: 'Roma, Itália',
      desc: 'Um museu a céu aberto.',
      price: 'R$ 4.800'
    },
    default: {
      title: 'Destino Incrível',
      desc: 'Prepare-se para viver dias inesquecíveis.',
      price: 'Consulte'
    }
  };

  openModal(id: string) {
    this.selectedDetail =
      this.detailsDatabase[id] || this.detailsDatabase.default;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedDetail = null;
    document.body.style.overflow = 'auto';
  }

  /* ===============================
     CARROSSEL
     =============================== */

  @ViewChild('carouselInt') carouselInt!: ElementRef;
  @ViewChild('carouselNac') carouselNac!: ElementRef;

  isDown = false;
  startX = 0;
  scrollLeft = 0;
  animationIds: number[] = [];

  startDrag(e: MouseEvent, slider: HTMLElement) {
    this.isDown = true;
    slider.classList.add('active');
    this.startX = e.pageX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;
  }

  endDrag() {
    this.isDown = false;
  }

  moveDrag(e: MouseEvent, slider: HTMLElement) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = this.scrollLeft - (x - this.startX) * 2;
  }

  startSmoothScroll(slider?: HTMLElement) {
    if (!slider) return;

    const speed = 0.5;

    const animate = () => {
      if (!this.isDown) {
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += speed;
        }
      }
      this.animationIds.push(requestAnimationFrame(animate));
    };

    animate();
  }

  ngOnDestroy() {
    this.animationIds.forEach(id => cancelAnimationFrame(id));
  }

  /* ===============================
     CONTROLE DE SOM DO VÍDEO
     =============================== */
  isMuted = true;

  toggleMute() {
    const video = this.backgroundVideo?.nativeElement;
    if (!video) return;

    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
    console.log('Botão de mudo clicado. Novo estado de isMuted:', this.isMuted, 'Estado de video.muted:', video.muted);
  }
}
