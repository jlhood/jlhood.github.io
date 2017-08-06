var grCoverLink = $('#gr_custom_widget_1496878058 .gr_custom_book_container_1496878058 a')[0];
var grCoverImg = $('#gr_custom_widget_1496878058 .gr_custom_book_container_1496878058 img')[0];
var coverLink = $('#currently-reading-cover a')[0];
var coverImg = $('#currently-reading-cover img')[0];

coverLink.href = grCoverLink.href;
coverImg.alt = grCoverImg.alt;
coverImg.src = grCoverImg.src;

var grTitleLink = $('#gr_custom_widget_1496878058 .gr_custom_title_1496878058 a')[0];
var titleLink = $('#currently-reading-title a')[0];
titleLink.href = grTitleLink.href;
titleLink.text = grTitleLink.text;

var grAuthorLink = $('#gr_custom_widget_1496878058 .gr_custom_author_1496878058 a')[0];
var authorLink = $('#currently-reading-author a')[0];
authorLink.href = grAuthorLink.href;
authorLink.text = grAuthorLink.text;
