export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "SAR" }).format(
    value
  );

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}
