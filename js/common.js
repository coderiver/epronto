head.ready(function() {

	$('.menu').click(function(event) {
		$('body').toggleClass('is-menu');
		return false;
	});



	$('.feedbacks').slick({
	  slidesToShow: 3,
	  responsive: [
	    {
	      breakpoint: 880,
	      settings: {
	        slidesToShow: 2
	      }
	    },
	    {
	      breakpoint: 640,
	      settings: {
	        slidesToShow: 1
	      }
	    }
	  ]
	});
});