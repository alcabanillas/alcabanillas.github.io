(function () {
  /* Redirect depending on the partial file being loaded */
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

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };


  
  /**
   * Load partial view depending on click
   */
  
  function goToClicked(e) {
    e.preventDefault();

    partialView = e.currentTarget.dataset.partialview;
    history.pushState(partialView, null, partialView);
    loadPartialView(partialView);
    e.stopPropagation();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  on('click', '.goTo', goToClicked, true);

  function loadPartialView(partialView) {
    $("#render").load("partials/" + partialView);
  }

  /**
   * Collapse navbar when clicked
   */
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }


})();
