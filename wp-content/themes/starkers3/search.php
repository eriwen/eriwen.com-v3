<?php get_header(); ?>
<?php if ( have_posts() ) : ?>
	<?php
	/* Run the loop for the search to output the results.
	 * If you want to overload this in a child theme then include a file
	 * called loop-search.php and that will be used instead.
	 */
	 get_template_part( 'loop', 'search' );
	?>
<?php else : ?>
<section id="content">
	<h2>Not Found</h2>
	<p>Sorry, but you are looking for something that isn't here. You might consider searching with different terms.</p>
    <form action="http://eriwen.com" method="get" id="searchform">
        <input type="search" value="" name="s" results="6" size="60" placeholder="Search posts..." />
		<input type="submit" value="Search" />
    </form>
	<p></p>
	<p>It is also most likely that you are looking for a post more people have found useful. Here are the most popular:</p>
	<ul><li><a href="http://eriwen.com/javascript/js-stack-trace/">A Javascript stacktrace in any browser</a></li><li><a href="http://eriwen.com/productivity/find-is-a-beautiful-tool/">Find is a beautiful tool</a></li><li><a href="http://eriwen.com/bash/effective-shorthand/">Effective bash shorthand</a></li><li><a href="http://eriwen.com/tools/grep-is-a-beautiful-tool/">grep is a beautiful tool</a></li><li><a href="http://eriwen.com/firefox/firefox-3-chrome-tweaks/">Early Adopters: Your Firefox 3 chrome tweaks are HERE</a></li><li><a href="http://eriwen.com/javascript/highlight-search-results-with-js/">How to highlight search results with JavaScript and CSS</a></li></ul>
</section>
<?php endif; ?>
<?php get_sidebar(); get_footer(); ?>
