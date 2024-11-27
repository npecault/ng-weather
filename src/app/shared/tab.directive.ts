import {Directive, inject, input, InputSignal, output, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appTab]'
})
export class TabDirective {
  readonly templateRef: TemplateRef<unknown> = inject(TemplateRef<unknown>);
  readonly tabId: InputSignal<string> = input.required();
  readonly tabName: InputSignal<string> = input.required();
  readonly default: InputSignal<boolean> = input(false);

  readonly closeTab = output();

  close(): void {
    this.closeTab.emit();
  }
}
