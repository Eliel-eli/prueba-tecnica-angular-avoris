import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../../models/hotel.model';
import { HotelesService } from '../../services/hoteles.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  nameFilter: string = '';
  starsFilter: number[] = [];
  ratingFilter: number = 0;
  priceFilter: number = 1000;
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  displayedHotels: Hotel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private hotelesService: HotelesService) {}

  ngOnInit() {
    // Llama al servicio para obtener los hoteles y los almacena en la variable hotels
    this.hotelesService.getHotels().subscribe((data: Hotel[]) => {
      this.hotels = data;
      this.performSearch();
    });
  }
  /**
   * Busqueda segun criterios de busqueda
   */
  performSearch() {
    this.filteredHotels = this.hotels.filter((hotel) => {
      const matchesName = hotel.name
        .toLowerCase()
        .includes(this.nameFilter.toLowerCase());
      const matchesStars =
        this.starsFilter.length === 0 || this.starsFilter.includes(hotel.stars);
      const matchesRating = hotel.rate >= this.ratingFilter;
      const matchesPrice = hotel.price <= this.priceFilter;
      return matchesName && matchesStars && matchesRating && matchesPrice;
    });
    this.totalItems = this.filteredHotels.length;
    this.setPage(1);
  }
  /**
   * establece la pagina y actualiza los hoteles que se muestran
   * @param page
   * @returns
   */
  setPage(page: number) {
    if (page < 1 || page > this.getPagesArray().length) return;
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedHotels = this.filteredHotels.slice(startIndex, endIndex);
  }
  /**
   * Obtiene un array con las paginas
   * @returns
   */
  getPagesArray() {
    return Array(Math.ceil(this.totalItems / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }
  /**
   * actualiza el filtro de estrellas
   * @param event
   * @param star
   */
  updateFilterStars(event: any, star: number) {
    if (event.target.checked) {
      this.starsFilter.push(star);
    } else {
      this.starsFilter = this.starsFilter.filter((s) => s !== star);
    }
    this.performSearch();
  }
  /**
   * cantidad de estrellas por hotel
   * @param stars
   * @returns
   */
  getStarsArray(stars: number) {
    return Array(stars).fill(0);
  }
}
