export function queryAncestors(
  array: Array<any>,
  current: any,
  parentId: string,
  id = 'id'
) {
  const result = [current];
  const hashMap = new Map();
  array.forEach((item) => hashMap.set(item[id], item));

  const getPath = (current: any) => {
    const currentParentId = hashMap.get(current[id])[parentId];
    if (currentParentId) {
      result.push(hashMap.get(currentParentId));
      getPath(hashMap.get(currentParentId));
    }
  };

  getPath(current);
  return result;
}
