import { Routes } from '@angular/router';

import { TemplateFormComponent } from './component/template-form/template-form.component';
import { DataFormComponent } from './component/data-form/data-form.component';

export const routes: Routes = [
  { path: "templateForm", component: TemplateFormComponent },
  { path: "dataForm", component: DataFormComponent },
  { path: "", pathMatch: "full", redirectTo: "dataForm" }
];
