(function() {
    ////////////////////--VARIABLES--////////////////////
    var kitties = document.getElementsByTagName('img');
    var dots = document.getElementsByClassName('dot');
    var timer;
    var active = 0;
    var transitioningRightNow;

    ////////////////////--EVENT LISTENER ON TOUCH (BONUS)--////////////////////
    document.addEventListener('touchmove', function() {
        if (transitioningRightNow){
            return;
        } else {
            clearTimeout(timer);
            moveKitties();
        }


    });

    ////////////////////--EVENT LISTENER ON TRANSITION--////////////////////
    document.addEventListener('transitionend', function(e){
        if (e.target.classList.contains("offscreen-left")) {
            e.target.classList.remove("offscreen-left");
            timer = setTimeout(moveKitties, 1000);
            transitioningRightNow = false;
        }
    });

    ////////////////////--EVENT LISTENER ON CLICKS--////////////////////

    Array.prototype.slice.call(dots).forEach(function(dot, index) {
        dot.addEventListener('click', function (e) {

            if (e.target.classList.contains("on")) {
                return;
            }
            if (transitioningRightNow) {
                return;
            }
            clearTimeout(timer);
            moveKitties(index);
        });
    });

    ////////////////////--TRANSITIONING MY KITTIES--////////////////////
    function moveKitties (next) {
        transitioningRightNow = true;
        kitties[active].classList.remove('onscreen');
        kitties[active].classList.add('offscreen-left');
        dots[active].classList.remove('on');

        if (typeof next == "undefined") {
            active++;
            if (active >= kitties.length) {
                active = 0;
            }
        } else {
            active = next;
        }

        kitties[active].classList.add('onscreen');
        dots[active].classList.add('on');
    }

    timer = setTimeout(moveKitties, 1000);

}());
