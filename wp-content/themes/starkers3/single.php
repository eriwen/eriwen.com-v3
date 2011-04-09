<?php ob_start("ob_gzhandler"); get_header(); ?>
<section id="content" role="main">
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article class="post" id="post-<?php the_ID(); ?>">
<header><h1><a href="<?php echo get_permalink() ?>" rel="bookmark" title="Permanent Link: <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
<div class="postmeta"><?php echo "{Topic: [";the_category(',');echo "]"; ?>, <?php comments_number('Comments: 0', 'Comments: 1', 'Comments: %'); ?>}
	</div></header>
<div class="postbody">
    <?php the_content('Read more &raquo;'); ?>
    <?php edit_post_link('Edit', '', ''); ?>
    <?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
</div>
</article>
<?php if (!is_mobile()): ?>
<section id="share">
<p><strong>If you liked this post, please help me share it.</strong></p>
<?php echo "<script type='text/javascript'>window.__title='".get_the_title()."';window.__permalink='". get_permalink()."';</script>\n"; ?>
<span id='reddit-container'></span> <span id='twitter-container'></span> <span id='su-container'></span> <span id='dzone-container'></span>
</section>
<?php endif; ?>
<section id="related-posts">
	<h4 class="related-posts-header">{Similar Posts}</h4>
<?php related_posts(); ?>
</section>
	<?php comments_template( '', true ); ?>
	<?php endwhile; else: ?>
	<p>Sorry, no posts matched your criteria.</p>
<?php endif; ?>
</section> <!-- <section id="content"> -->
<?php get_sidebar(); get_footer(); ob_end_flush(); ?>
