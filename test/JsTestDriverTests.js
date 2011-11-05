PageTest = TestCase("PageTest");

PageTest.prototype.testGetSearchStringFromUrl = function() {
    var actual = Page.fn.getSearchStringFromUrl('?s=foo');
    assertEquals('foo', actual);

    var separate = Page.fn.getSearchStringFromUrl('?s=foo+bar');
    assertEquals('foo|bar', separate);
};

