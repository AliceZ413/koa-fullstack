'use client';

import { Button } from 'antd';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Button>Login</Button>
      {children}
    </main>
  );
}
