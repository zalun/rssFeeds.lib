require.config({
  baseUrl: './js/lib',
  map: { '*': { 'jquery': 'zepto' } }
});

requirejs(['../app']);
