(function () {
  /* Redirect depending on the partial file being loaded */
  var history = "";

  var routes = {
    "": "partials/home.html",
    "/": "partials/home.html",
    "#/home": "partials/home.html",
    "#/about": "partials/about.html",
    "#/resume": "partials/resume.html",
    "#/portfolio": "partials/portfolio.html",
    "#/contact": "partials/contact.html"
  };

 
  function router() {
    var link = window.location.hash;
    var innerElement = "";

    // ----------------------------------------
    // If more than one parameter in the link,
    // I am targeting an element in the page,
    // an anchor. First load page, the scroll
    // the element into view.
    // ----------------------------------------

    var count = link.split("/").length - 1;
    if (count > 1) {
      // anchor element
      innerElement = link.split("/")[2];

      // page to load
      link = "#/" + link.split("/")[1];
    }

    // ----------------------------------------
    // Remember loaded page - used to avoid
    // page reload on internal linking
    // ----------------------------------------
    if (history === link && innerElement) {
      scrollIntoView(innerElement);
      history = link;
      return;
    }
    history = link;

    // get path (route) for page
    console.log("link: " + link);
    var route = routes[link];

    // if route exists, load page
    console.log("route:" + route);
    if (route) {
      loadPage(route, innerElement);
    }

    setActiveItem(link);
  }

  // listen hash path changes
  window.addEventListener("hashchange", router);

  // call the urlLocationHandler to load the page
  router();

  async function loadPage(url, innerElement) {
    // load page
    const res = await fetch(url);
    const content = await res.text();
    const element = document.getElementById("render");
    element.innerHTML = content;

    // ------------------------------------------
    // Scroll to top -- need to avoid navigation
    // drift on page. Else the scroll state
    // carries over on to next page
    // ------------------------------------------
    window.scrollTo(0, 0);

    // element scroll into view
    if (innerElement) {
      scrollIntoView(innerElement);
    }
  }

  function setActiveItem(link) {
    $(".navbar a.active").removeClass("active");

    if (link) {
      $(`.navbar a[href='${link}']`).addClass("active");
    } else {
      $(".navbar a[href='#/home']").addClass("active");
    }
  }

  function scrollIntoView(id) {
    document.getElementById(id).scrollIntoView();
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
   * change active link when clicked
   */
  $(".navbar").on("click", "a", function () {
    $(".navbar a.active").removeClass("active");
    $(this).addClass("active");
  });

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
