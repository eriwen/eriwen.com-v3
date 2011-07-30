describe('Page', function() {
	it('should get the search term from a query string', function() {
		var actual = Page.fn.getSearchStringFromUrl('?s=foo');
		expect(actual).toEqual('foo');
	});
	
	it('should separate search terms by pipes', function() {
		var actual = Page.fn.getSearchStringFromUrl('?s=foo+bar');
		expect(actual).toEqual('foo|bar');
	});
	
	it('should determine the size of 1em on body', function() {
		document.documentElement.style.fontSize = '13px';
		expect(Page.fn.getEmSize()).toEqual(13);
	});
});