/**
 * приймає число і повертає заповнений масив від 1 до числа
 * @example (3) >> [1,2,3]
 **/
export const fillArray = (count: number) => {
  let i = 0;
  const a = Array(count);

  while (i < count) a[i++] = i;

  return a;
};
