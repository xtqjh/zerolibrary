/**
 * @作者: zc
 * @时间: 2018-05-18 19:24:27
 * @描述: 路由动画
 */
import {
  trigger,  // 动画封装触发，外部的触发器
  style, // 用来书写基本的样式
  transition, // 用来实现css3的 transition
  animate, // 用来实现css3的animations
  group,
  animateChild,
  query,
  stagger
} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ], { optional: true }),
    ])
  ])
]);
