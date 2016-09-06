// try{
// 	navigator.serviceWorker.getRegistration().then((r)=>{r.unregister()
// 	});
			  
// }catch(err){

// }
if(navigator.serviceWorker){
	navigator.serviceWorker.register("/sw");	
}
(function(){
	

	let sticky = false;

	$(document).ready(()=>{
		const image_counter = parseInt($("[data-name='image_counter']").attr("content") - 1);
		let current_position = 0;
		isOpen();
		setInterval(()=>{
			if(current_position < image_counter){
				current_position++;
			}else{
				current_position = 0;
			}
			$("#gallery .inner").css({
				left: "-"+(current_position * 100)+"%"
			});
		},3000)
		$(window).scroll((ev)=>{
			const inBottom = isInBottom();
			if(!sticky && inBottom){
				stickNavigation();
			}
			if(!inBottom && sticky){
				unStickNavigation();
			}
		})

		$(".menu").on("click",()=> {$("#responsive-nav ul").toggleClass("active")} )

	});
	function isOpen(){
		const current_hour = (new Date()).getHours();
		if(current_hour < 17 || current_hour > 23){
			$("#is_open .text").html("Cerrado ahora <br> Abierto de 5:00pm a 11:00pm")
		}
	}

	function isInBottom(){
		const $description = $("#description");
		const descriptionHeight = $description.height()
		return $(window).scrollTop() > $(window).height() - descriptionHeight *2;
	}

	function stickNavigation(){
		sticky = true;
		$("#description").addClass("fixed").removeClass("absolute");
		$("#navigation").fadeOut();
		let $newDiv = $("#description .navigation");
		$newDiv.addClass("in")
	}
	function unStickNavigation(){
		sticky = false;
		$("#description").addClass("absolute").removeClass("fixed");
		$("#navigation").fadeIn();
		let $newDiv = $("#description .navigation");
		$newDiv.removeClass("in")
	}

})();
