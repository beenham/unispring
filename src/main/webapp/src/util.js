export function setLoggedInUser(user) {
  if (localStorage === undefined) return false;
  localStorage.setItem("user", JSON.stringify(user));
  return true;
}

export function getLoggedInUser() {
  if (localStorage === undefined) return undefined;
  const user = localStorage.getItem("user");
  if (user === undefined) return undefined;
  return JSON.parse(user);
}

export function isLoggedIn() {
  return getLoggedInUser() !== undefined;
}

export function mapDistinctCount(data, property) {
  return data.reduce((acc, o) => {
    acc[o[property]] = (acc[o[property]] || 0) + 1;
    return acc;
  }, {});
}

export function getGraphData(data, property, colours, title) {
  data = mapDistinctCount(data, property);

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
