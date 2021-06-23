import { TemplateRef } from '@angular/core';

export interface Column {
  name: string;
  type?: 'index' | 'customColumn';
  template?: TemplateRef<any>;
  position?: 'center';
}
