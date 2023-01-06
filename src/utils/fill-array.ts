export const fillArray = (count: number) => {
  let i = 0,
    a = Array(count);

  while (i < count) a[i++] = i;

  return a;
};
