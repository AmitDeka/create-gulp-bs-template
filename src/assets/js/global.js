$(document).ready(function () {
  // Footer year
  const yearCurrent = new Date().getFullYear();
  $("#currentYear").append(yearCurrent);

  //
  var current = location.pathname;
  console.log(current);
  if (current == "/") {
    $("#homePage").addClass("active");
    $("#homePage").attr("aria-current", "page");
  } else {
    $("#nav li a").each(function () {
      var $this = $(this);
      if ($this.attr("href").indexOf(current) !== -1) {
        $this.addClass("active");
        $this.attr("aria-current", "page");
      }
    });
  }
});
