'use client';

import React, { PropsWithChildren } from 'react';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';

const ConfigProvider = ({ children }: PropsWithChildren) => (
  <>
    <AntdConfigProvider
      componentSize='middle'
      theme={{
        token: {
          //   colorPrimary: '#13c2c2',
          borderRadius: 16,
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      {children}
    </AntdConfigProvider>
  </>
);

export default ConfigProvider;
