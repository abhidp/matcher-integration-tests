export const randomString = (length?: number) => {
  length = length || 10;
  return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
};

export const randomNumber = (length?: number) => {
  length = length || 4;
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
};
