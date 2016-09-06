$(document).on "ready page:load page:restore", ()->
	form_id = "my-form"
	validate_form = (form_id)->
		$form = $("##{form_id}")
		if is_form_valid(form_id)
			$form.submit()
		else
			$el = $form.find(".input:invalid").first().parent()
			focus_step($el)
	
	is_form_valid = (form_id)->
		document.getElementById(form_id).checkValidity()
	
	focus_indicator = ($el)->
		$(".path-step.active").removeClass("active")
		$el.addClass("active")
	
	focus_step = ($el)->
		$(".step.active").removeClass("active")
		$el.addClass("active")
		$(".step.active .input").focus()
		console.log $('.step.active').index()
		focus_indicator($(".path-step:nth-child(#{$('.step.active').index()+1})"))
	
	
	$(".step textarea").on "keydown", (ev)->
		if ev.keyCode == 13
			is_valid = $(this).val().length > 0
			ev.preventDefault()
			if is_valid
				$(this).blur()
			else
				$("#info").html "Necesitas escribirnos algo :)"

	$(".step .input").on "change", (ev)->
		$next_input = $(this).parent().next()
		if !is_form_valid(form_id) && $next_input.length > 0
			focus_step($next_input)
		else
			validate_form(form_id)

	$(".path-step").on "click",(ev)->
		position = $(this).data("position")
		focus_indicator($(this))
		$(".step.active").removeClass("active")
		

		$(".step:nth-child(#{position}").addClass("active")
		
