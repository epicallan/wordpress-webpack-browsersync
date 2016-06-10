// require styles

import activateMalarkey from './module/title';

function loadingComplete() {
  // eslint-disable-next-line no-console
  console.log('Page Loaded Activating malarkey.');
  activateMalarkey();
}

document.addEventListener('DOMContentLoaded', loadingComplete);
