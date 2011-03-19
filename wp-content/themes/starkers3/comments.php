<?php
/**
 * The template for displaying Comments.
 *
 * The area of the page that contains both current comments
 * and the comment form.  The actual display of comments is
 * handled by a callback to twentyten_comment which is
 * located in the functions.php file.
 *
 * @package WordPress
 * @subpackage Starkers
 * @since Starkers 3.0
 */
?>
<?php comment_form(); ?>
<?php if ( have_comments() ) : ?>
  <section id="comments">
	<header><h4 class="responses-header">{Responses: <span class="numcomments"><?php comments_number('0', '1', '%' );?></span>}</h4></header>
<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through? ?>
	   <?php previous_comments_link( __( '&larr; Older Comments', 'twentyten' ) ); ?>
	   <?php next_comments_link( __( 'Newer Comments &rarr;', 'twentyten' ) ); ?>
<?php endif; // check for comment navigation ?>
	<ol class="commentlist">
<?php wp_list_comments(array('avatar_size'=>40, 'reply_text'=>'Reply')); ?>
	</ol>
  </section>
<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // Are there comments to navigate through? ?>
	   <?php previous_comments_link( __( '&larr; Older Comments', 'twentyten' ) ); ?>
	   <?php next_comments_link( __( 'Newer Comments &rarr;', 'twentyten' ) ); ?>
<?php endif; // check for comment navigation ?>
<?php if ($trackback == true) { ?>
<h4 class="trackbacks-header"><a name="trackbacks"></a>Trackbacks</h4>
<ul class="trackback-list">
<?php foreach ($comments as $comment) : ?>
    <?php $comment_type = get_comment_type(); ?>
    <?php if($comment_type != 'comment') { ?>
    <li><?php comment_author_link() ?></li>
    <?php } ?>
<?php endforeach; ?>
</ul>
<?php } ?>
<?php else : 
	if ( ! comments_open() ) :
?>
<?php endif; // end ! comments_open() ?>
<?php endif; // end have_comments() ?>