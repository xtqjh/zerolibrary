/**
 * @作者: zc
 * @时间: 2019-04-19 17:38:11
 * @描述: 颜色翻译
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'channelColor'
})
export class ChannelColorPipe implements PipeTransform {

    private _channelColors: {} = {
        'banquet': '#FF3E50',
        'group': '#fc7b26',
        'hotel': '#CD33D3',
        'shop': '#2F79E9',
        'smoke': '#906a2a',
        'super': '#23991D'
    };

    constructor() { }

    transform(value: any): any {
        if (this._channelColors.hasOwnProperty(value)) {
            return this._channelColors[value];
        }
    }
}
