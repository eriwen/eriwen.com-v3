<section id="content">
<?php if (have_posts()) : ?><?php while (have_posts()) : the_post(); ?>
<article class="post" id="post-<?php the_ID(); ?>">
<header><h1><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
<div class="postmeta"><?php echo "{Topic: [";the_category(',');echo "]"; ?>, <?php comments_popup_link('Comments: 0', 'Comments: 1', 'Comments: %'); ?>}</div></header>
<div class="postbody"><?php the_excerpt('Read more &raquo;'); ?><?php edit_post_link('Edit', '', ''); ?></div></article>
<?php comments_template( '', true ); ?><?php endwhile; ?>
<div class="navigation"><?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } ?></div>
<?php else : ?><h2>Not Found</h2><p>Sorry, but you are looking for something that isn't here.</p><?php endif; ?>
</section> <!-- </section id="content" -->
