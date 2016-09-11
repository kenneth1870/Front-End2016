// try{
// 	navigator.serviceWorker.getRegistration().then((r)=>{r.unregister()
// 	});

// }catch(err){

// }
"use strict";

if (navigator.serviceWorker) {
	navigator.serviceWorker.register("/sw");
}
(function () {

	var sticky = false;

	$(document).ready(function () {
		var image_counter = parseInt($("[data-name='image_counter']").attr("content") - 1);
		var current_position = 0;
		isOpen();
		setInterval(function () {
			if (current_position < image_counter) {
				current_position++;
			} else {
				current_position = 0;
			}
			$("#gallery .inner").css({
				left: "-" + current_position * 100 + "%"
			});
		}, 3000);
		$(window).scroll(function (ev) {
			var inBottom = isInBottom();
			if (!sticky && inBottom) {
				stickNavigation();
			}
			if (!inBottom && sticky) {
				unStickNavigation();
			}
		});

		$(".menu").on("click", function () {
			$("#responsive-nav ul").toggleClass("active");
		});
	});
	function isOpen() {
		var current_hour = new Date().getHours();
		if (current_hour < 17 || current_hour > 23) {
			$("#is_open .text").html("Cerrado ahora <br> Abierto de 5:00pm a 11:00pm");
		}
	}

	function isInBottom() {
		var $description = $("#description");
		var descriptionHeight = $description.height();
		return $(window).scrollTop() > $(window).height() - descriptionHeight * 2;
	}

	function stickNavigation() {
		sticky = true;
		$("#description").addClass("fixed").removeClass("absolute");
		$("#navigation").fadeOut();
		var $newDiv = $("#description .navigation");
		$newDiv.addClass("in");
	}
	function unStickNavigation() {
		sticky = false;
		$("#description").addClass("absolute").removeClass("fixed");
		$("#navigation").fadeIn();
		var $newDiv = $("#description .navigation");
		$newDiv.removeClass("in");
	}
})();
