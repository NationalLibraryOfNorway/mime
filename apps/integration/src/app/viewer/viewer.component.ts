import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  manifestUri: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('manifestUri')) {
        this.manifestUri = params.get('manifestUri');
      } else {
        this.manifestUri =
          'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest';
      }
    });
  }
}
