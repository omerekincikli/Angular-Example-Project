import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs'

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() {
    alertifyjs.set('notifier', 'position', 'bottom-center');
  }

  success(message: any) {
    alertifyjs.success(message);
  }

  confirm(message: string, okCallback: () => any, cancelCallback: () => any) {
    alertifyjs.confirm(message, 'Are you sure?',
      () => { okCallback(); },
      () => { cancelCallback(); }
    );
  }

  error(message: any) {
    alertifyjs.error(message);
  }

  warning(message: any) {
    alertifyjs.warning(message);
  }
}
