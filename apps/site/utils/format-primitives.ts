export const conciseDate: (date: Date | string) => string = date => {
  const dateObject = typeof date === "string" ? new Date(date) : date;
  return dateObject.toLocaleDateString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  });
};
