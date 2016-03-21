export const NUM_PER_PAGE = 30;

export function getStartIndex(page) {
  const pageIndex = Number(page) - 1;
  const start = pageIndex * NUM_PER_PAGE;

  return start;
}
