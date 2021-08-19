import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchIndex } from 'algoliasearch/lite';
import { debounceTime, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  form = this.fb.control('');

  index: SearchIndex = this.searchService.index.materials;
  result!: {
    nbHits: number; // ヒット件数
    hits: any[]; // 結果のリスト
  };

  page!: number;

  constructor(
    private searchService: SearchService,
    public authService: AuthService,
    public materialService: MaterialService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((map) => {
      const keyword = map.get('keyword') || '';
      this.page = parseInt(map.get('page') as string, 10);
      this.form.patchValue(keyword, {
        emitEvent: false,
      });
    });

    this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.router.navigate([], {
        queryParams: {
          keyword: value || null,
        },
        queryParamsHandling: this.page ? '' : 'merge',
      });
    });
  }

  check(event: MatRadioChange) {
    const category = event.source.value;
    this.router
      .navigate([], {
        queryParams: {
          category: category,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        if (category !== '') {
          this.userService.setSearchHistory(
            this.authService.uid as string,
            category
          );
        }
      });
  }

  userCheck() {
    this.userService
      .getUser(this.authService.uid as string)
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        console.log(user);
      });
  }
}
