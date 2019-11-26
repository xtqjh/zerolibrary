

/**
 * bold转文件带下载
 * @param _file_data 文件流 bold
 * @param _file_name 下载文件名称指定
 */
export function isDownload(_file_data: any, _file_name?: string) {
  const blob = new Blob([_file_data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('style', 'display:none');
  a.setAttribute('href', objectUrl);
  a.setAttribute('download', _file_name || '默认文件名称');
  a.click();
  document.body.removeChild(a);
  // 释放URL地址
  URL.revokeObjectURL(objectUrl);
}

/**
 * 现金额转大写
 */
export function digitUppercase(n: any): string {
  const fraction = ['角', '分'];
  const digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  const head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}


/**
 * 将以base64的图片url数据转换为Blob
 */
export function convertBase64UrlToBlob(urlData: string): Blob {
  // 去掉url的头，并转换为byte
  const bytes = window.atob(urlData.split(',')[1]);

  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/png' });
}
