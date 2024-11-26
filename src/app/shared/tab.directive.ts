import {Directive, inject, input, InputSignal, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appTab]'
})
export class TabDirective {
  readonly templateRef: TemplateRef<unknown> = inject(TemplateRef<unknown>);
  readonly tabId: InputSignal<string> = input.required();
}
