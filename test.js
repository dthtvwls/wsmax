require('phantom').create(function (ph) {

  for (var i = 0; i < process.env.COUNT; i++) {
    ph.createPage(function (page) {
      page.open(process.env.HOST);
    });
  }

});
