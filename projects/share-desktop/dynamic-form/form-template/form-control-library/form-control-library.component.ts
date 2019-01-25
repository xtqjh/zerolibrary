/**
 * @作者: zc
 * @时间: 2018-07-20 19:52:05
 * @描述: 控件库
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormTemplateService, SelectValue, Parameter } from '../form-template.service';
// import { fadeIn, fadeOut, flyIn, flyOut, shrink, stretch, zoomIn, zoomOut } from '../../../../animations/simple-anim';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { ConfigService, Result } from '../../../core/service/config.service';

@Component({
  selector: 'zc-form-control-library',
  templateUrl: './form-control-library.component.html',
  styleUrls: ['../form-template.component.css'],
  providers: [FormTemplateService]
})
export class FormControlLibraryComponent {

  @Output() resLibraryChange: EventEmitter<SelectValue> = new EventEmitter<SelectValue>();

  @Input() set subordinate(_data) {
    // this.items = this.formTemplateService.SELECT_VALUE;
    if (_data) {
      const _group_switch = this.items.findIndex(_v => _v.key === 'GroupSwitch');
      this.items.splice(_group_switch, 1);
      const _group = this.items.findIndex(_v => _v.key === 'Group');
      this.items.splice(_group, 1);
    }
  }

  @Input() set parameter(data: Parameter) {
    if (data.external) {
      this.getExternal().subscribe(
        res => res.forEach(exte => this.items.push({
          txt: exte.suite.name,
          key: exte.suite.type,
          icon: '',
          fields: exte.suite.fields
        }))
      );
    }
  }

  items: Array<SelectValue> = this.formTemplateService.SELECT_VALUE;

  private oa: string = this.pages.url.oa;

  constructor(
    private http: HttpClient,
    private pages: ConfigService,
    private formTemplateService: FormTemplateService
  ) { }

  private getExternal() {
    const json = sessionStorage.getItem('cacheExternal');
    if (json) {
      return of(JSON.parse(json));
    }
    const params$ = new HttpParams().set('page', '1').set('size', '20');
    return this.http.get(`${this.oa}/api/oa/form-suite`, { params: params$ })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((res: Result<any>) => res.content),
        tap(res => sessionStorage.setItem('cacheExternal', JSON.stringify(res)))
      );
  }

  selectItem(_item) {
    this.resLibraryChange.emit(_item);
  }

}
