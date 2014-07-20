head.ready(function() {

	$('.menu').click(function(event) {
		$('body').toggleClass('is-menu');
		return false;
	});

	console.log($('body').html());
});