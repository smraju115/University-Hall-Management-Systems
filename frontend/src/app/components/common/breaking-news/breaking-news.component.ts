import { Component } from '@angular/core';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrl: './breaking-news.component.css'
})
export class BreakingNewsComponent {
  breakingNewsList: string[] = [
    "Hall will remain closed on January 1, 2024 due to maintenance.",
    "New student room allocations have been updated!",
    "Payment deadlines extended to February 15, 2024.",
    "Check out the latest hall facilities upgrades.",
    "Submit your feedback by January 31, 2024."
  ];
}
