/**
 * src/app/plugins/fontawesome.ts
 * Configures and registers FontAwesome icons globally.
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons you need
import { faUser, faCog, faSignOutAlt, faPlus, faEdit, faTrash, faEye, faTimes, faCheck, faExclamationTriangle, faBars, faHome, faQuestion, faBook, faGraduationCap, faChartBar, faBell, faUpload, faDownload, faFileExcel, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(
  faUser, faCog, faSignOutAlt, faPlus, faEdit, faTrash, faEye, faTimes, faCheck, faExclamationTriangle, faBars, faHome, faQuestion, faBook, faGraduationCap, faChartBar, faBell, faUpload, faDownload, faFileExcel, faSpinner
);

export function setupFontAwesome(app: any) {
  app.component('font-awesome-icon', FontAwesomeIcon);
}
