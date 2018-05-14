import { FacebookService } from '../facebook.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { FacebookConfig, FACEBOOK_CONFIG } from '../facebook-config';

declare let FB: any;

@Component({
  selector: 's-facebook-page',
  templateUrl: './facebook-page.component.html',
  styleUrls: ['./facebook-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookPageComponent implements OnInit, AfterViewInit {

  constructor(
    private facebookService: FacebookService,
    @Inject(FACEBOOK_CONFIG) private config: FacebookConfig
  ) { }
  
  ngOnInit() {

  }

  pageName = this.config.pageName;

  async ngAfterViewInit() {
    const firstLoad = await this.facebookService.loadScriptAsync();
    if (!firstLoad) {
      FB.XFBML.parse(); //不是 firstload 才需要 parse, first page 还会有 Bug 哦
    }
  }

}
