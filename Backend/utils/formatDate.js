function formatDate(isoDate) {
  const d = Date.parse(isoDate);
  const day = new Date(d).getDate();
  const month = new Date(d).getMonth() + 1;
  const year = new Date(d).getFullYear();
  return `${day <= 10 ? `0${day}` : day}/${
    month <= 10 ? `0${month}` : month
  }/${year}`;
}

module.exports = { formatDate };
