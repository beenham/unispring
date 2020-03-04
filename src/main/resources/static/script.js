document.querySelectorAll('.modal-button').forEach(function(el) {
    el.addEventListener('click', function() {
      var target = document.querySelector(el.getAttribute('data-target'));
      
      target.classList.add('is-active');
      
      target.querySelector('.modal-close').addEventListener('click',   function() {
          target.classList.remove('is-active');
       });
    });
  });


  $(document).ready(function() {
    $('#tabs li').on('click', function() {
      var tab = $(this).data('tab');
  
      $('#tabs li').removeClass('is-active');
      $(this).addClass('is-active');
  
      $('#tab-content section').removeClass('is-active');
      $('section[data-content="' + tab + '"]').addClass('is-active');
    });

    $(".modal-button").click(function(){
          var target = $(this).attr('data-target');
          
          $(target).addClass('is-active');
    });

    $('.modal-close').click(function() {
      $(this).closest(".modal").removeClass('is-active');
    });

  });

  $(document).ready(function() {
    $('#tabs_2 li').on('click', function() {
      var tab = $(this).data('tab');
  
      $('#tabs_2 li').removeClass('is-active');
      $(this).addClass('is-active');
  
      $('#tab-content_2 section').removeClass('is-active');
      $('section[data-content="' + tab + '"]').addClass('is-active');
    });
  });