//This function is for our test, and for the production we don't need it
export const randomSelect = (options: unknown[]) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};
