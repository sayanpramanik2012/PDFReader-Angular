import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  selectedFile: File | null = null;
  message = '';
  question = '';
  chat: { type: 'user' | 'ai'; text: string }[] = [];
  pdfUploaded = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadPDF() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('pdf', this.selectedFile);

    this.http.post('http://localhost:3000/upload', formData).subscribe({
      next: () => {
        this.pdfUploaded = true;
        this.message = 'PDF uploaded successfully!';
      },
      error: () => {
        this.message = 'Error uploading PDF';
      },
    });
  }

  sendQuestion() {
    if (!this.question.trim()) return;

    const userMsg = this.question;
    this.chat.push({ type: 'user', text: userMsg });
    this.question = '';

    this.http
      .post<any>('http://localhost:3000/ask', { question: userMsg })
      .subscribe({
        next: (res) => {
          this.chat.push({ type: 'ai', text: res.answer });
        },
        error: () => {
          this.chat.push({ type: 'ai', text: 'Error getting response.' });
        },
      });
  }
}
