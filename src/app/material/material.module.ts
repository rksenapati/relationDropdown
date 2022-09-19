import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

const material_modules=[MatSelectModule]

@NgModule({
  declarations: [],
  imports: [...material_modules],
  exports:[...material_modules]
})
export class MaterialModule { }
