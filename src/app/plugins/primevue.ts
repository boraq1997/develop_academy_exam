/**
 * src/app/plugins/primevue.ts
 * Configures and registers PrimeVue components and services.
 */

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';

import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Message from 'primevue/message';
import ConfirmDialog from 'primevue/confirmdialog';
import Card from 'primevue/card';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Menu   from 'primevue/menu';
import Badge  from 'primevue/badge';
import Tooltip from 'primevue/tooltip';

const MyTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6f7f5',
      100: '#ccefeb',
      200: '#99dfd7',
      300: '#66cfc3',
      400: '#33bfaf',
      500: '#1FAF9F',
      600: '#1a8f82',
      700: '#146f65',
      800: '#0f5048',
      900: '#09302b'
    },

    secondary: {
      500: '#5DADE2' // سماوي هادئ
    },

    highlight: {
      background: '#2E8B57', // أخضر متوسط
      focusBackground: '#3CB371',
      color: '#ffffff'
    },

    surface: {
      900: '#0B2E2F' // خلفية داكنة مائلة للأخضر المزرق
    }
  }
})

export function setupPrimeVue(app: any) {
    app.use(PrimeVue, {
        ripple: true,
        theme: {
            preset: MyTheme,
            options: {
            darkModeSelector: false
            }
        }
    });
    app.use(ConfirmationService);
    app.use(ToastService);
    app.use(DialogService);

    app.directive('tooltip', Tooltip);

    app.component('Button', Button);
    app.component('Toast', Toast);
    app.component('Message', Message);
    app.component('ConfirmDialog', ConfirmDialog);
    app.component('Card', Card);
    app.component('InputIcon', InputIcon);
    app.component('IconField', IconField);
    app.component('InputText', InputText);
    app.component('Password', Password);
    app.component('Avatar', Avatar);
    app.component('Menu', Menu);
    app.component('Badge', Badge);
}
