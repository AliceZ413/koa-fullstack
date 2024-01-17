'use client';

import { Breadcrumb } from 'antd';

import styles from './Bread.module.css';
import { pathToRegexp } from 'path-to-regexp';
import { queryAncestors } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ItemType } from 'antd/es/menu/hooks/useItems';

export default function Bread({ routerList }: { routerList: Array<ItemType> }) {
  const pathname = usePathname();
  const currentRoute = routerList.find(
    (e) => e?.key && pathToRegexp(e.key as string).exec(pathname)
  );

  console.log(currentRoute);
  

  const paths = currentRoute
    ? queryAncestors(routerList, currentRoute, 'breadcrumbParentId').reverse()
    : [
        routerList[0],
        {
          id: 404,
          name: `Not Found`,
        },
      ];

  console.log(paths);
  const items = paths.map((e) => ({
    title: e.zh.name,
    path: e.route,
  }));

  return (
    <Breadcrumb
      className={styles.bread}
      items={items}
    >
      {/* {paths.map((item, key) => {
        const content = item && (
          <>
            {item.icon && (
              <span style={{ marginRight: '4px' }}>{item.icon}</span>
            )}
          </>
        );
        return (
          item && (
            <>
              <BreadcrumbItem key={key}>
                {paths.length - 1 !== key ? (
                  <Link href={item.route || '#'}>{content}</Link>
                ) : (
                  content
                )}
              </BreadcrumbItem>
            </>
          )
        );
      })} */}
    </Breadcrumb>
  );
}
