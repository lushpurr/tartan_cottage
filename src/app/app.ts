import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule]
})
export class App {
  protected readonly title = signal('tartan-cottage');

  contactData = signal({
    name: 'Gavin Will',
    email: 'email@email.com',
    message: 'Hello, I would like to get in touch with you.'
  });

  showForm = signal(false);

  submitForm(){
    console.log('Form submitted:', this.contactData());
  }

  toggleForm() {
    this.showForm.set(!this.showForm());
  }
}
