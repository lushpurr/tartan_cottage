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
    name: '',
    email: '',
    message: ''
  });

  showForm = signal(false);

  submitForm(){
    console.log('Form submitted:', this.contactData());
    if(this.contactData().name && this.contactData().email && this.contactData().message) {
      // Here you can add your form submission logic, e.g., sending the data to a server
      console.log('Form data is valid. Proceeding with submission...');
    } else {
      console.log('Form data is invalid. Please fill in all fields.');
    }

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
    });
  }

//   onSubmit() {
//   if (this.form.invalid) return;

//   const formData = new FormData();

//   formData.append('access_key', 'YOUR_ACCESS_KEY');
//   formData.append('name', this.form.value.name);
//   formData.append('email', this.form.value.email);
//   formData.append('message', this.form.value.message);

//   fetch('https://api.web3forms.com/submit', {
//     method: 'POST',
//     body: formData
//   })
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//   });
// }

  toggleForm() {
    this.showForm.set(!this.showForm());
  }
}
