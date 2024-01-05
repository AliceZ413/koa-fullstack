import { Component, PageProps } from './types';
import { PageContext } from 'vike/types';
import { createSSRApp, defineComponent, h } from 'vue';

function createApp(Page: Component, pageProps: PageProps | undefined, pageContext: PageContext) {
  const PageWithLayout = defineComponent({
    render() {
      return h(Page, pageProps || {});
    },
  });
  return createSSRApp(PageWithLayout);
}

export { createApp };
