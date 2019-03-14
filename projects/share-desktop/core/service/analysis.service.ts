/**
 * @作者: zc
 * @时间: 2019-03-13 10:36:58
 * @描述: 解析 excel
 */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {


  constructor() {

  }

  /**
   * 解析 excel
   */
  fileAnalysisExcel(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const dataSet = (XLSX.utils.sheet_to_json(ws, { header: 0 }));
      console.log(dataSet);
    };
    reader.readAsBinaryString(file);
  }


}


