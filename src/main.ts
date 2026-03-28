/**
 * src/main.ts
 * The entry point for the Vue 3 application.
 * Configures PrimeVue, FontAwesome, global styles, and mounts the root component.
 */

import { createApp } from 'vue';
import App from './App.vue';

// Import global styles
import './assets/styles/main.css';

// Import plugin setups
import { setupPrimeVue } from './app/plugins/primevue';
import { setupFontAwesome } from './app/plugins/fontawesome';

// Import router
import router from './app/router';

// Import Pinia
import { createPinia } from 'pinia';

const app = createApp(App);

// Setup PrimeVue
setupPrimeVue(app);

// Setup FontAwesome
setupFontAwesome(app);

// Use router
app.use(router);

// Use Pinia
app.use(createPinia());

app.mount('#app');
