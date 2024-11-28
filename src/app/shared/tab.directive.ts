import {Directive, inject, input, output, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appTab]'
})
export class TabDirective {
  readonly templateRef: TemplateRef<unknown> = inject(TemplateRef<unknown>);
  readonly tabId = input.required<string>();
  readonly tabName = input.required<string>();
  readonly default = input<boolean>(false);

  readonly closeTab = output();

  close(): void {
    this.closeTab.emit();
  }
}
