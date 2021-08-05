import { Component, OnInit } from '@angular/core';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  index: SearchIndex = this.searchService.index.materials;

  result!: {
    nbHits: number;
    hits: any[];
  };
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.search('');
  }

  private search(query: string) {
    this.index.search(query).then((result) => {
      // 検索結果を格納
      this.result = result;
    });
  }
}
