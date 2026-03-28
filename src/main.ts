import { createApp } from 'vue'
import { definePreset } from '@primeuix/themes'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';

import './style.css';
const app = createApp(App);

const MyPreset = definePreset(Aura, {
    semantic: {
    // اللون الأساسي للنظام
    primary: {
        50: '{orange.50}',
        100: '{orange.100}',
        200: '{orange.200}',
        300: '{orange.300}',
        400: '{orange.400}',
        500: '{orange.500}',
        600: '{orange.600}',
        700: '{orange.700}',
        800: '{orange.800}',
        900: '{orange.900}',
        950: '{orange.950}'
        },
    }
});

app.use(PrimeVue, {
    ripple: true,
    rtl: true,
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.dark-mode',
        }
    },
});

app.use(ToastService);
app.directive('tooltip', Tooltip);
// Register the Toast component globally
app.component('Toast', Toast);

// Register the ConfirmationService for confirmation dialogs
app.use(ConfirmationService);

// Register the Ripple directive for adding ripple effects to interactive elements
app.directive('ripple', Ripple);


app.use(PrimeVue);
app.mount('#app');