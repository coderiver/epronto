head.ready(function() {

	$('.menu').click(function(event) {
		$('body').toggleClass('is-menu');
		return false;
	});

	//$( ".js-datepicker" ).datepicker();

	$( ".js-datein" ).datepicker({
		minDate: 0,
		onSelect: function( selectedDate ) {
			$( ".js-dateout" ).datepicker( "option", "minDate", selectedDate );
		}
	});
	$( ".js-dateout" ).datepicker({
		onSelect: function( selectedDate ) {
			$( ".js-datein" ).datepicker( "option", "maxDate", selectedDate );
		}
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


	$(document).click(function(event) {
        if (!$(event.target).closest('.search_form').length) {
            if ($('.select_list').is(":visible")) {
                $('.select_list').hide().removeClass("opened");
            }
        }
    })
});