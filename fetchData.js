import fetch from "node-fetch";

export default function fetchData(req, res, token) {
  var content =
    req.body.content || res.status(500).json({ error: "Content is required" });

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res.status(200).json({ result: result });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}
