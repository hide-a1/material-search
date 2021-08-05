import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CropperOptions } from '@deer-inc/ngx-croppie';
import { Material } from 'functions/interfaces/material';
import { MaterialService } from 'src/app/services/material.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  categoryOptions: string[] = [
    '床材',
    '壁材',
    '屋根材',
    '天井材',
    '断熱材',
    '防音材',
    '手すり材',
    '不燃材',
  ];
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    detail: [''],
  });

  options: CropperOptions = {
    aspectRatio: 4 / 3,
    width: 200,
    resultType: 'base64',
  };

  image: string = '';
  isExistImage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onCroppedImage(image: string) {
    this.image = image;
    this.isExistImage = true;
  }

  submit() {
    if (!this.image) {
      this.isExistImage = false;
      return;
    }
    const data: Omit<Material, 'id'> = {
      name: this.form.get('name')?.value,
      category: this.form.get('category')?.value,
      detail: this.form.get('detail')?.value,
      thumbnail: this.image,
    };
    this.materialService.createMaterial(data).then(() => {
      this.form.reset();
      this.image = '';
      this.snackBar.open('投稿が完了しました');
    });
    console.log('submit');
  }
}
