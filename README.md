# WARNING!
:rotating_light: :rotating_light: :rotating_light:

This package is still under development and is not optimized nor tested. Please have some time and check back later ;)

:rotating_light: :rotating_light: :rotating_light:

# NG Modal Factory

The purpose of this packages is to allow the display a (modal-)component, within everywhere inside of the application. The (modal-)component will be rendert inside of the outlet.

## Installation

```$ npm i ng-modal-factory```

## Quick Start

### 1. Import the Module

```TypeScript
@NgModule({
  ...
  imports: [
    ...,
    ModalFactoryModule
  ]
  ...
})
export class AppModule { }
```

### 2. Place the outlet

```HTML
...
<ng-modal-factory-outlet></ng-modal-factory-outlet>
...
```

### 3. Open a Modal (This example was using the Clarity Design Framework)

```TypeScript
public openModal()
  {
    this.modalFactoryService.openNewAlertModal({
      component: AlertModalComponent, <-- Your modal component
      inputs: {
        bodyTemplate: this.modalBody, <-- Your modal body
        buttons: [
          {
            text: 'custom',
            style: 'link',
            click: () => console.log('custom')
          },
          {
            text: 'Cancel',
            style: 'outline',
            click: () => console.log('Cancel'),
          },
          {
            text: 'Ok',
            type: 'primary',
            click: () => console.log('Ok'),
          },
        ],
      },
    });
  }
```
