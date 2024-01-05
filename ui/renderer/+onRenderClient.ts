import type { OnRenderClientAsync } from 'vike/types';
import {createApp} from "./app";

const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext;
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');
  const app = createApp(Page, pageProps, pageContext);
  app.mount('#app');
};

export { onRenderClient };
