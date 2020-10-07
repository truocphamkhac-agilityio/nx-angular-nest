import { Component, OnInit } from '@angular/core';

import { DataService, JournalEntry } from './services/data.service';

@Component({
  selector: 'nx-angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'journal';
  entries: JournalEntry[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.dataService.fetch().subscribe({
      next: (response: JournalEntry[]) => (this.entries = response),
    });
  }

  onSaveEntry(titleInput: HTMLInputElement, bodyInput: HTMLInputElement) {
    const entry = {
      title: titleInput.value,
      body: bodyInput.value,
    };
    this.dataService.save(entry).subscribe({
      next: () => {
        this.fetch();
        titleInput.value = '';
        bodyInput.value = '';
      },
    });
  }

  onDeleteEntry(index: number) {
    this.dataService.delete(index).subscribe({
      next: () => {
        this.fetch();
      },
    });
  }
}
