async function login() {
  let domain = document.getElementById("domain").value;
  if (!domain) return;
  let apikey = document.getElementById("apikey").value;
  if (!apikey) return;

  let base_url = `https://${domain}.freshdesk.com/api/v2/`;
  let headers = { Authorization: "Basic " + btoa(apikey) };

  let url = base_url + "tickets";
  let data = await fetch(url, {
    method: "GET",
    headers,
  }).catch((error) => {
    throw ("Error:", error);
  });

  if (data.status != 200) {
    customAlert("danger", "invalid credentials!");
    console.log(await data.json());
  } else {
    window.localStorage.setItem("domain", domain);
    window.localStorage.setItem("api_key", apikey);
    window.location.href = `./index.html`;
  }
}
function customAlert(type, message) {
  let newAlert = $("#alert");
  newAlert.html(`
  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${message}</strong></br>check console for more
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  </div>`);
  setTimeout(() => {
    newAlert.html("");
  }, 3000);
}
