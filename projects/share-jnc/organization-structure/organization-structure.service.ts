import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { ConfigService, Result } from '../core/service/config.service';
import { isObjectDelKay } from '../core/tools/object';
import { isGuid } from '../core/tools/string';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStructureService {

  private jswapi = this.config.url.jswapi;
  private hr = this.config.url.hr;

  private _headers = new HttpHeaders()
    .set('Authorization', 'bearer ' + localStorage.getItem('access_token'))
    .set('X-Requested-With', 'XMLHttpRequest');

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {

  }

  /**
   * 通过token获取员工基础信息
   */
  private getTokenToStaff() {
    const json = sessionStorage.getItem('zc_organiz_staff');
    if (json) {
      return of(JSON.parse(json));
    }
    return this.http.get(`${this.jswapi}app/token_get_company_uuid`, { headers: this._headers })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content),
        tap(v => sessionStorage.setItem('zc_organiz_staff', JSON.stringify(v)))
      );
  }

  /**
   * 获取通讯录权限
   */
  private getStaffAdminMail(data: { postCode: string }) {
    const json = sessionStorage.getItem('zc_organiz_staff_admin_mail');
    if (json) {
      return of(JSON.parse(json));
    }
    return this.http.get(`${this.jswapi}staff/admin_mail`, { headers: this._headers, params: data })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content),
        tap(v => sessionStorage.setItem('zc_organiz_staff_admin_mail', JSON.stringify(v)))
      );
  }

  /**
   * 绑定通讯录权限
   */
  private setDeparMail(depar: Array<any>, mail: Array<any>) {
    depar.map(ele => {
      if (ele.type === 'department') {
        const mm = mail.find(m => m.departmentId === ele.id);
        if (mm) { ele.show = true; }
        if (ele.children) { this.setDeparMail(ele.children, mail); }
      }
    });
    return depar;
  }

  /**
   * 过滤权限以外的通讯录
   */
  private setDeparMailSuperior(depar: Array<any>) {
    const list = [];
    depar.map(ele => {
      if (ele.show) {
        list.push(ele);
      } else {
        if (ele.children) {
          const bb = this.setDeparMailSuperior(ele.children);
          if (bb.length > 0) {
            ele.children = bb;
            list.push(ele);
          }
        }
      }
    });
    return list;
  }

  /**
   * 通讯录所有部门（树形结构）和员工
   */
  public getDeparMemberTree() {
    const adminType = sessionStorage.getItem('MI_ADMIN');
    if (adminType === 'LEVEL_ADMIN') {
      return this.getTokenToStaff().pipe(
        switchMap(staff => this.getStaffAdminMail({ postCode: staff.post_code }).pipe(
          switchMap(mail => this.getAllDeparMemberTree().pipe(
            switchMap(deparA => of(this.setDeparMail(deparA, mail))),
            switchMap(deparB => of(this.setDeparMailSuperior(deparB)))
          ))
        ))
      );
    } else {
      return this.getAllDeparMemberTree();
    }
  }

  /**
   * 全量通讯录所有部门（树形结构）和员工
   */
  private getAllDeparMemberTree() {
    const json = sessionStorage.getItem('zc_organiz_department_staff_tree');
    if (json) {
      return of(JSON.parse(json));
    }
    return this.http.get(this.jswapi + 'company/department_tree/staff', { headers: this._headers })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content),
        map(v => this.setTreeNodesDMT(v)),
        tap(v => sessionStorage.setItem('zc_organiz_department_staff_tree', JSON.stringify(v)))
      );
  }

  // 设置 DMT 树结构
  private setTreeNodesDMT(list$: Array<any>) {
    list$.map(ele => {
      ele.type = 'department';
      ele.icon = 'iconfont icon-wenjianjia';
      ele.title = ele.name;
      ele.key = isGuid(16);
      if (ele.staff) {
        ele.children = ele.staff.map(staff$ => {
          staff$.type = 'staff';
          staff$.icon = 'iconfont icon-touxiang';
          staff$.title = staff$.name;
          staff$.key = isGuid(16);
          staff$.isLeaf = true;
          return staff$;
        });
      }
      if (ele.sub) {
        const _c$: Array<any> = this.setTreeNodesDMT(ele.sub);
        ele.children.push(..._c$);
      }
      isObjectDelKay(ele, 'staff');
      isObjectDelKay(ele, 'sub');
    });
    return list$;
  }

  /**
   * 公司所有岗位
   */
  public getCompanyPost() {
    const json = sessionStorage.getItem('zc_organiz_company_post');
    if (json) {
      return of(JSON.parse(json));
    }
    return this.http.get(this.jswapi + 'company/post?size=999', { headers: this._headers })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content.content),
        map(v => this.setTreeNodesCPT(v)),
        tap(v => sessionStorage.setItem('zc_organiz_company_post', JSON.stringify(v)))
      );
  }

  // 设置 CPT 树结构
  private setTreeNodesCPT(list$: Array<any>) {
    list$.map(ele => {
      ele.type = 'post';
      ele.icon = 'iconfont icon-gangwei';
      ele.title = ele.name;
      ele.key = isGuid(16);
      ele.isLeaf = true;
    });
    return list$;
  }

  /**
   * 通讯录标签
   */
  public getRecruitTag() {
    const json = sessionStorage.getItem('zc_organiz_recruit_tag');
    if (json) {
      return of(JSON.parse(json));
    }
    return this.http.get(this.hr + 'recruit/tag?method=info', { headers: this._headers })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content),
        map(v => this.setTreeNodesRTT(v)),
        tap(v => sessionStorage.setItem('zc_organiz_recruit_tag', JSON.stringify(v)))
      );
  }

  // 设置 CPT 树结构
  private setTreeNodesRTT(list$: Array<any>) {
    list$.map(ele => {
      ele.type = 'tag';
      ele.icon = 'iconfont icon-iconfontlink';
      ele.title = ele.tagName;
      ele.key = isGuid(16);
      ele.isLeaf = true;
    });
    return list$;
  }

  /**
   * 编制结构树
   */
  public getDepartmentPostTree() {
    const json = sessionStorage.getItem('zc_organiz_department_post_tree');
    if (json) {
      return of(JSON.parse(json));
    }
    return this.http.get(this.jswapi + 'company_new/Department_post/getDepartmentPostTree', { headers: this._headers })
      .pipe(
        filter((v: Result<any>) => v.errCode === 0),
        map((v: Result<any>) => v.content),
        map(v => this.setTreeNodesDPT(v)),
        tap(v => sessionStorage.setItem('zc_organiz_department_post_tree', JSON.stringify(v)))
      );
  }

  // 设置 DPT 树结构
  private setTreeNodesDPT(list$: Array<any>) {
    list$.map(ele => {
      ele.type = 'department';
      ele.icon = 'iconfont icon-wenjianjia';
      ele.title = ele.name;
      ele.key = isGuid(16);
      ele.disableCheckbox = true;
      if (ele.post_info) {
        ele.children = ele.post_info.map(post$ => {
          post$.type = 'department_post';
          post$.icon = 'iconfont icon-gangwei';
          post$.title = post$.name;
          post$.key = isGuid(16);
          post$.isLeaf = true;
          return post$;
        });
      }
      if (ele.son) {
        const _c$: Array<any> = this.setTreeNodesDPT(ele.son);
        ele.children.push(..._c$);
      }
      isObjectDelKay(ele, 'post_info');
      isObjectDelKay(ele, 'son');
    });
    return list$;
  }
}
