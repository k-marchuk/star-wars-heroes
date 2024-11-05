export const generatePagerElements = (page: number, pages: number) => {
  const items: Array<string | number> = [1, 2, pages - 1, pages];
  const middleItems = [];

  if (page > 2 && page < pages - 1) {
    if (page > 3) {
      middleItems.push(0);
    }

    middleItems.push(page);

    if (page < pages - 2) {
      middleItems.push(0);
    }
  } else {
    middleItems.push(0);
  }

  items.splice(2, 0, ...middleItems);

  return items;
};
