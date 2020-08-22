export const isAlphanumeric = (input: string) => {
  const letterAndNumber = /^[0-9a-zA-Z]+$/;

  return !!input.match(letterAndNumber);
};
