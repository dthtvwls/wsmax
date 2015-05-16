require('phantom').create(function (ph) {

  for (var i = 0; i < (process.env.COUNT || 500); i++) {
    ph.createPage(function (page) {
      page.open(process.env.HOST || 'http://localhost:5000', function (status) {
        process.stdout.write(status === 'success' ? '.' : '!');
      });
    });
  }

});
