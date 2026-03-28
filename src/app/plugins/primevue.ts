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

const MyTheme = definePreset(Aura, {
    semantic: {
        primary: {
        50: '#fff8d1',
        100: '#ffeaa3',
        200: '#f8d96a',
        300: '#f0c83a',
        400: '#e6b800',
        500: '#DAA112',
        600: '#b3860e',
        700: '#8c6a0b',
        800: '#665007',
        900: '#403204'
        },

        secondary: {
        500: '#809276'
        },

        highlight: {
        background: '#666E51',
        focusBackground: '#666E51',
        color: '#ffffff'
        },

        surface: {
        900: '#10383A'
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

    app.component('Button', Button);
    app.component('Toast', Toast);
    app.component('Message', Message);
    app.component('ConfirmDialog', ConfirmDialog);
    app.component('Card', Card);
    app.component('InputIcon', InputIcon);
    app.component('IconField', IconField);
    app.component('InputText', InputText);
    app.component('Password', Password);
  
}
