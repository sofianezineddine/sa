!(function($) {
  "use strict";

  // Theme Toggle Functionality - Microsoft Edge Compatible
  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme with fallback for Edge
    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      
      // Force repaint for Edge
      if (window.navigator.userAgent.indexOf('Edge') > -1 || window.navigator.userAgent.indexOf('Edg') > -1) {
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
      }
    }
    
    // Update icon based on current theme
    function updateThemeIcon(theme) {
      if (theme === 'dark') {
        themeIcon.className = 'bx bx-moon';
      } else {
        themeIcon.className = 'bx bx-sun';
      }
    }
    
    // Initialize theme and icon
    applyTheme(currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  // Initialize theme toggle
  initThemeToggle();

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top - 70;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('.nav-menu').hasClass('active')) {
          $('.nav-menu').removeClass('active');
          $('.nav-overlay').removeClass('active');
          $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
          $('body').css('overflow', 'auto');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - 70;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    $('.nav-menu').toggleClass('active');
    $('.nav-overlay').toggleClass('active');
    
    if ($('.nav-menu').hasClass('active')) {
      $('.mobile-nav-toggle i').removeClass('icofont-navigation-menu').addClass('icofont-close');
      $('body').css('overflow', 'hidden');
    } else {
      $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
      $('body').css('overflow', 'auto');
    }
  });

  // Close menu when clicking on overlay
  $(document).on('click', '.nav-overlay', function() {
    $('.nav-menu').removeClass('active');
    $('.nav-overlay').removeClass('active');
    $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
    $('body').css('overflow', 'auto');
  });
  
  // Close menu when clicking outside
  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle, .nav-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('.nav-menu').hasClass('active')) {
        $('.nav-menu').removeClass('active');
        $('.nav-overlay').removeClass('active');
        $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
        $('body').css('overflow', 'auto');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 140;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 370) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 2
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

// Theme toggle for non-jQuery functionality - Edge Compatible
document.addEventListener('DOMContentLoaded', function() {
  // Ensure theme is applied on page load with Edge compatibility
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.body.setAttribute('data-theme', savedTheme);
  
  // Force style recalculation for Microsoft Edge
  if (window.navigator.userAgent.indexOf('Edge') > -1 || window.navigator.userAgent.indexOf('Edg') > -1) {
    setTimeout(function() {
      document.body.style.visibility = 'hidden';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.visibility = 'visible';
    }, 10);
  }
});


/*console print*/
console.log(
  `%c                       
                                ___________________________________________
                                ___________________________________________
                                < That's it You can Check my Code Here 😀>
                                -------------------------------------------
                                -------------------------------------------

 ______             __  __                    __            _______                                                       
 /      \           /  |/  |                  /  |          /       \                                                      
/$$$$$$  |  ______  $$/ $$ |   __   ______   _$$ |_         $$$$$$$  |  ______   __    __                                  
$$ \__$$/  /      \ /  |$$ |  /  | /      \ / $$   |        $$ |__$$ | /      \ /  |  /  |                                 
$$      \  $$$$$$  |$$ |$$ |_/$$/  $$$$$$  |$$$$$$/         $$    $$< /$$$$$$  |$$ |  $$ |                                 
 $$$$$$  | /    $$ |$$ |$$   $$<   /    $$ |  $$ | __       $$$$$$$  |$$ |  $$ |$$ |  $$ |                                 
/  \__$$ |/$$$$$$$ |$$ |$$$$$$  \ /$$$$$$$ |  $$ |/  |      $$ |  $$ |$$ \__$$ |$$ \__$$ |                                 
$$    $$/ $$    $$ |$$ |$$ | $$  |$$    $$ |  $$  $$/       $$ |  $$ |$$    $$/ $$    $$ |                                 
 $$$$$$/   $$$$$$$/ $$/ $$/   $$/  $$$$$$$/    $$$$/        $$/   $$/  $$$$$$/   $$$$$$$ |                                 
                                                                                /  \__$$ |                                 
                                                                                $$    $$/                                  
                                                                                 $$$$$$/                                                                                                                                             
                                                                                                                           
 __       __            __              _______                                 __                                         
/  |  _  /  |          /  |            /       \                               /  |                                        
$$ | / \ $$ |  ______  $$ |____        $$$$$$$  |  ______   __     __  ______  $$ |  ______    ______    ______    ______  
$$ |/$  \$$ | /      \ $$      \       $$ |  $$ | /      \ /  \   /  |/      \ $$ | /      \  /      \  /      \  /      \ 
$$ /$$$  $$ |/$$$$$$  |$$$$$$$  |      $$ |  $$ |/$$$$$$  |$$  \ /$$//$$$$$$  |$$ |/$$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |
$$ $$/$$ $$ |$$    $$ |$$ |  $$ |      $$ |  $$ |$$    $$ | $$  /$$/ $$    $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$ |  $$/ 
$$$$/  $$$$ |$$$$$$$$/ $$ |__$$ |      $$ |__$$ |$$$$$$$$/   $$ $$/  $$$$$$$$/ $$ |$$ \__$$ |$$ |__$$ |$$$$$$$$/ $$ |      
$$$/    $$$ |$$       |$$    $$/       $$    $$/ $$       |   $$$/   $$       |$$ |$$    $$/ $$    $$/ $$       |$$ |      
$$/      $$/  $$$$$$$/ $$$$$$$/        $$$$$$$/   $$$$$$$/     $/     $$$$$$$/ $$/  $$$$$$/  $$$$$$$/   $$$$$$$/ $$/       
                                                                                             $$ |                          
                                                                                             $$ |                          
                                                                                             $$/                           
           
                                                                                        
                                                                                        
                                                                                        
                                                                               `,
  "font-family:monospace"
);
