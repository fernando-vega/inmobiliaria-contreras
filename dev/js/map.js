jQuery(document).ready(function($) {
	$('.medio__mapa').each(function(index, el) {
		$map = $(this);
		$map.gmap3({
	        map:{
	            options: {
	                center:[$map.attr('data-map-lat'),$map.attr('data-map-lon')],
	                zoom: 16,
	                scrollwheel: false,
	                zoomControl: true,
	                mapTypeControl: false,
	                zoomControlOptions: {
	                    style: google.maps.ZoomControlStyle.SMALL
	                },
	                panControl: false,
	            },
	        },
	        marker:{
	            latLng: [$map.attr('data-map-lat'),$map.attr('data-map-lon')],
	            options:{
	                icon: $map.attr('data-map-img')
	            }
	        }
	    });
	});
});