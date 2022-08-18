(function () {
  var queryString;

  if (window.location.search != "") {
    queryString = new window.URLSearchParams(window.location.search);
    console.log(queryString);

    switch (queryString.get("d")) {
      case "0":
        $("#render").load("partials/home.html");
        break;
      case "1":
        $("#render").load("partials/about.html");
        break;
      case "2":
        $("#render").load("partials/resume.html");
        break;
      case "3":
        $("#render").load("partials/portfolio.html");
        break;
      case "4":
        $("#render").load("partials/contact.html");
        break;
    }
  } else {
    $("#render").load("partials/home.html");
  }

  // event handlers
  $(document).on("click", ".goTo", goToClicked);

  function goToClicked(e) {
    e.preventDefault();

    partialView = e.currentTarget.dataset.partialview;
    history.pushState(partialView, null, partialView);
    loadPartialView(partialView);
    e.stopPropagation();
  }

  function loadPartialView(partialView) {
    $("#render").load("partials/" + partialView);
  }

  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });
})();
