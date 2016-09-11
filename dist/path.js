(function() {
  $(document).on("ready page:load page:restore", function() {
    var focus_indicator, focus_step, form_id, is_form_valid, validate_form;
    form_id = "my-form";
    validate_form = function(form_id) {
      var $el, $form;
      $form = $("#" + form_id);
      if (is_form_valid(form_id)) {
        return $form.submit();
      } else {
        $el = $form.find(".input:invalid").first().parent();
        return focus_step($el);
      }
    };
    is_form_valid = function(form_id) {
      return document.getElementById(form_id).checkValidity();
    };
    focus_indicator = function($el) {
      $(".path-step.active").removeClass("active");
      return $el.addClass("active");
    };
    focus_step = function($el) {
      $(".step.active").removeClass("active");
      $el.addClass("active");
      $(".step.active .input").focus();
      console.log($('.step.active').index());
      return focus_indicator($(".path-step:nth-child(" + ($('.step.active').index() + 1) + ")"));
    };
    $(".step textarea").on("keydown", function(ev) {
      var is_valid;
      if (ev.keyCode === 13) {
        is_valid = $(this).val().length > 0;
        ev.preventDefault();
        if (is_valid) {
          return $(this).blur();
        } else {
          return $("#info").html("Necesitas escribirnos algo :)");
        }
      }
    });
    $(".step .input").on("change", function(ev) {
      var $next_input;
      $next_input = $(this).parent().next();
      if (!is_form_valid(form_id) && $next_input.length > 0) {
        return focus_step($next_input);
      } else {
        return validate_form(form_id);
      }
    });
    return $(".path-step").on("click", function(ev) {
      var position;
      position = $(this).data("position");
      focus_indicator($(this));
      $(".step.active").removeClass("active");
      return $(".step:nth-child(" + position).addClass("active");
    });
  });

}).call(this);

