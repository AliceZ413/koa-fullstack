import { LoadingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useState } from 'react';

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 24 }}
    spin
  />
);

const { TabPane } = Tabs;

export default function HeaderNoticeComponent() {
  const [visible, setVisible] = useState(false);
  return <div></div>;
}
