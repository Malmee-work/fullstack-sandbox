import configuration from "../config";

async function client(endpoint, method, body) {
  const headers = {};
  let requestBody = body;

  if (body) {
    requestBody = JSON.stringify(body);
    headers["content-type"] = "application/json";
  }

  const config = {
    method,
    headers,
  };

  if (requestBody) {
    config.body = requestBody;
  }

  const response = await fetch(`${configuration.apiurl}${endpoint}`, config);

  try {
    return await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Error occured", err, response);
    throw err;
  }
}

export default client;
