export class PaginatedResponseDto<T> {
    payload: T;
    totalRecords: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  
    constructor(payload: T, totalRecords: number, itemsPerPage: number, currentPage: number) {
      this.payload = payload;
      this.totalRecords = totalRecords;
      this.itemsPerPage = itemsPerPage;
      this.currentPage = currentPage;
      this.totalPages = Math.ceil(totalRecords / itemsPerPage);
    }
  }
  