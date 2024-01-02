import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';

@Component({
  selector: 'app-like-widget',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  providers: [UniqueIdService],
  templateUrl: './like-widget.component.html',
  styleUrl: './like-widget.component.scss'
})
export class LikeWidgetComponent implements OnInit {
  @Output() public liked = new EventEmitter<void>();
  @Input() public id: null | string = null;
  @Input() public likes = 0;

  public icons = { faThumbsUp };

  constructor(private _uniqueIdService: UniqueIdService) {}

  public ngOnInit(): void {
    if (!this.id) {
      this.id = this._uniqueIdService.generateUniqueIdWithPrefix("like-widget");
    }
  }

  public like(): void {
    this.liked.emit();
  }
}
