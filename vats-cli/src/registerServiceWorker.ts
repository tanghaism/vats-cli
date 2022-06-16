/* eslint-disable no-console */
import { h } from 'vue';
import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  let savedPrompt: any = null;
  window.addEventListener(
    'beforeinstallprompt',
    function (e: any) {
      // 监听到可安装事件，进行触发提醒用户
      e.preventDefault();
      savedPrompt = e;
      window.$notification.info({
        message: '是否将网站安装在桌面上',
        description: h(
          'button',
          {
            type: 'button',
            class: 'el-button el-button--mini el-button--success is-round',
            id: 'prompt',
          },
          {
            default: () => '立即安装',
          },
        ),
      });
      setTimeout(() => {
        const btn = document.querySelector('#prompt');
        if (btn) {
          (btn as any).onclick = () => {
            savedPrompt.prompt();
            savedPrompt.userChoice.then((result: any) => {
              console.log(result);
            });
          };
        }
      }, 200);
      return false;
    },
    { once: true },
  );
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(registration: ServiceWorkerRegistration) {
      console.log('New content is available; please refresh.');
      const waitingServiceWorker = registration.waiting;
      if (waitingServiceWorker) {
        waitingServiceWorker.addEventListener('statechange', (event: any) => {
          if (event.target.state === 'activated') {
            window.$modal.confirm({
              title: '监测到新版本',
              content: '是否立即刷新，启用新版本？',
              okText: '立即刷新',
              cancelText: '放弃',
              onOk() {
                window.location.reload();
              },
            });
          }
        });
        waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
      }
      registration.update();
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
