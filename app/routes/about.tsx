/**
 * The root layout
 */
import { App, ConfigProvider } from 'antd';

export default function IndexPage() {
  return (
    <ConfigProvider>
      <App>
        <div>about</div>
      </App>
    </ConfigProvider>
  );
}
