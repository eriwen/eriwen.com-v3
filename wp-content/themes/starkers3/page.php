<?php ob_start("ob_gzhandler"); get_header(); ?>
<section id="content" role="main">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article class="post" id="post-<?php the_ID(); ?>">
<header><h1><a href="<?php echo get_permalink() ?>" rel="bookmark" title="Permanent Link: <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1></header>
<div class="postbody">
    <?php the_content('Read more &raquo;'); ?>
    <?php edit_post_link('Edit', '', ''); ?>
    <?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
</div>
</article>
<?php endwhile; else: ?>
<p>Sorry, no posts matched your criteria.</p>
<?php endif; ?>
</section> <!-- <section id="content"> -->
<?php get_sidebar(); get_footer(); ob_end_flush(); ?>