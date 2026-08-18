import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule]
})
export class App {
  protected readonly title = signal('tartan-cottage');

  contactData = signal({
    name: '',
    email: '',
    message: ''
  });

  showForm = signal(false);

  submitForm(){
    const formData = new FormData();
    formData.append('access_key', 'cad4e4cc-4129-47dc-a1c6-ceef769541db');
    formData.append('name', this.contactData().name);
    formData.append('email', this.contactData().email);
    formData.append('message', this.contactData().message);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      this.toggleForm();
      this.clearForm();
    });
  }
  toggleForm() {
    this.showForm.set(!this.showForm());
    if (!this.showForm()) {
      this.clearForm();
    }
  }

  clearForm(){
    this.contactData.set({
      name: '',
      email: '',
      message: ''
    });
  }
}
