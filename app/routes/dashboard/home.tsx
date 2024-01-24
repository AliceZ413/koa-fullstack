import { useLocation } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../stores';

export default function DashboardHome() {
  const [list, setList] = useState<Array<{ path: string }>>([]);
  const location = useLocation();
  return <div></div>;
}
