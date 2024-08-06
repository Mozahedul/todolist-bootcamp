function getDate() {
  const today = new Date();

  const options = {
    week: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleDateString("en-US", options);
}

function getDay() {
  const today = new Date();

  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
}

module.exports = { getDate, getDay };
