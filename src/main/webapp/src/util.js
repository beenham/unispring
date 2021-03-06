export function setLoggedInUser(user) {
  if (localStorage === undefined) return false;
  localStorage.setItem("user", JSON.stringify(user));
  return true;
}

export function getLoggedInUser() {
  if (localStorage === undefined) return undefined;
  const user = localStorage.getItem("user");
  if (user === undefined) return undefined;
  try {
      return JSON.parse(user);
  } catch (err) {
      return undefined;
  }
}

export function isLoggedIn() {
  return typeof getLoggedInUser() === "object";
}

export function sortObject(object, reverse = false) {
  const ordered = {};
  let keys = Object.keys(object).sort();
  if (reverse) keys = keys.reverse();
  keys.forEach(function(key) {
    ordered[key] = object[key];
  });
  return ordered;
}

export function mapDistinctCount(data, property) {
  return data.reduce((acc, o) => {
    acc[o[property]] = (acc[o[property]] || 0) + 1;
    return acc;
  }, {});
}

export function getGraphData(data, colours, title) {
  let keys = Object.keys(data).sort();
  let values = keys.map(key => data[key]);

  return {
    labels: keys,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: colours,
        borderColor: "#fff",
        borderWidth: 1
      }
    ]
  };
}
