import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  facetFilters!: string[];
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap) => {
      const keyword = paramMap.get('keyword') || '';
      const category = paramMap.get('category') || '';
      this.facetFilters = ['category:' + category];
      this.search(keyword, {
        facetFilters: this.facetFilters,
      });
    });
  }

  private search(
    query: string = '',
    options: {
      facetFilters: string[];
      page?: number;
      hitsPerPage?: number;
    }
  ) {
    this.index.search(query, options).then((result) => {
      // 検索結果を格納
      this.result = result;
    });
  }
}
