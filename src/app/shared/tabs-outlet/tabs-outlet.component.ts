import {Component, computed, contentChildren, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabDirective} from '../tab.directive';
import {TabsOutletTokenComponent} from './tabs-outlet-token.component';

@Component({
  selector: 'app-tabs-outlet',
  imports: [
    CommonModule
  ],
  templateUrl: './tabs-outlet.component.html',
  styleUrl: './tabs-outlet.component.css',
  providers: [{
    provide: TabsOutletTokenComponent,
    useExisting: TabsOutletComponent
  }]
})
export class TabsOutletComponent {
  protected readonly tabs = contentChildren(TabDirective);
  protected readonly activeTab = computed(
    () => this.tabs().find((tab) => this.activeTabId() === tab.tabId())?.templateRef
  );
  private readonly activeTabId: WritableSignal<string | null> = signal('10001');

  public setTab(tabId: string) {
    this.activeTabId.set(tabId);
  }
}
