/**
 * @作者: zc
 * @时间: 2018-05-18 19:10:07
 * @描述: 进出场动画·从上到下
 */
import {
  trigger,  // 动画封装触发，外部的触发器
  state, // 转场状态控制
  style, // 用来书写基本的样式
  transition, // 用来实现css3的 transition
  animate, // 用来实现css3的animations
  keyframes // 用来实现css3 keyframes的
} from '@angular/animations';
export const flyInUpDown = trigger('flyInUpDown', [
  state('in', style({ transform: 'translate(0)' })), // 默认平移0

  transition('void => *', [ // 进场动画
    animate(300, keyframes([
      style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
      style({ opacity: 1, transform: 'translateY(0)',     offset: 1.0 })
    ]))
  ]),
  transition('* => void', [ // 离场动画
    animate(300, keyframes([
      style({ opacity: 1, transform: 'translateY(0)',     offset: 0 }),
      style({ opacity: 0, transform: 'translateY(100%)',  offset: 1.0 })
    ]))
  ])
]);
