import malarkey from 'malarkey';

export default function activate() {
  const elem = document.querySelector('.title');
  const opts = { loop: true };

  activate.handle = malarkey(elem, opts);

  activate.handle
          .delete()
          .type('It Works Great!!').pause().delete()
          .type('ES6 + SASS + Live reloading in WordPress.').pause().delete()
          .type('Hello World').pause();
}
