(function () {
  /* Redirect depending on the partial file being loaded */
  var queryString;

  const partials = ['home.html', 'about.html', 'resume.html', 'portfolio.html', 'contact.html'];

  let partial;

  if (window.location.search != "") {
    queryString = new window.URLSearchParams(window.location.search);
    partial = partials[queryString.get("d")];
  }

  partial = partial || partials[0];

  $("#render").load(`partials/${partial}`);

  $(".navbar a.active").removeClass("active");
  $(`.navbar a[data-partialview='${partial}']`).addClass("active");

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
   * change active link when clicked
   */
  $(".navbar").on("click", "a", function () {
    $(".navbar a.active").removeClass("active");
    $(this).addClass("active");
  });

  /**
   * Load partial view depending on click
   */

  function goToClicked(e) {
    e.preventDefault();

    partialView = e.currentTarget.dataset.partialview;
    history.pushState(partialView, null, partialView);
    loadPartialView(partialView);
    //e.stopPropagation();
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
