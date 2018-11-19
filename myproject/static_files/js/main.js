var ampproject = function () {
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('toggle');
    let slides_count = document.getElementById('slides-count');
    const caption = document.querySelectorAll('.figcaption');
    const featured_vid = document.getElementById('featured-video');
    let slide_index = 1;

    navtoggle = function () {
        button.addEventListener('click', _ => {
            sidebar.classList.toggle('open');
        });
    };

    caption_toggle = function () {
        caption.forEach(function (elem) {
            elem.addEventListener("click", function () {
                this.classList.toggle('expanded');
            });
        });
    };

    display_next_image = function (n) {
        show_divs(slide_index += n);
    };

    sticky_video = function () {
        window.addEventListener('scroll', function (e) {
            var distance_to_top = featured_vid.getBoundingClientRect().top;
            var position_from_top = featured_vid.offsetTop;
            var element_height = featured_vid.offsetHeight;

            if (position_from_top > (distance_to_top + (element_height))) {
                featured_vid.classList.add('fixed');
            } else if (position_from_top == distance_to_top) {
                featured_vid.classList.remove('fixed');
            }
        });
    };

    show_divs = function (n) {
        var number_of_images = document.getElementsByClassName("carousel-slides");
        if (n > number_of_images.length) { slide_index = 1; }
        if (n < 1) { slide_index = number_of_images.length; }
        for (var i = 0; i < number_of_images.length; i++) {
            number_of_images[i].style.display = "none";

        }
        number_of_images[slide_index - 1].style.display = "block";
        slides_count.innerHTML = (slide_index) + '/' + number_of_images.length;
    };

    window.onload = function () {
        navtoggle();
        caption_toggle();
        if (featured_vid) { sticky_video(); }
        if (caption.length != 0) { show_divs(slide_index); }
    };
}();

