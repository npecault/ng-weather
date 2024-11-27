import {Component, computed, contentChildren, effect, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabDirective} from '../tab.directive';
import {TabsOutletTokenComponent} from './tabs-outlet-token.component';

@Component({
  selector: 'app-tabs-outlet',
  imports: [
    CommonModule
  ],
  templateUrl: './tabs-outlet.component.html',
  styleUrl: './tabs-outlet.component.scss',
  providers: [{
    provide: TabsOutletTokenComponent,
    useExisting: TabsOutletComponent
  }]
})
export class TabsOutletComponent {
  protected readonly activeTabId: WritableSignal<string | undefined> = signal(undefined);
  protected readonly tabs = contentChildren(TabDirective);
  protected readonly activeTab = computed(
    () => this.tabs().find((tab) => this.activeTabId() === tab.tabId())?.templateRef
  );

  constructor() {
    const defaultEffect = effect(() => {
      const defaultTab = this.tabs().find(tab => tab.default());
      this.activeTabId.set(defaultTab?.tabId());
      if (defaultTab) {
        defaultEffect.destroy();
      }
    });
  }


  protected tabClose(event: MouseEvent, tab: TabDirective) {
    event.stopPropagation();
    tab.close();
  }

  protected tabClick(tab: TabDirective) {
    this.activeTabId.set(tab.tabId());
  }
}
