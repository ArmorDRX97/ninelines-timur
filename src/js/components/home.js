import LocomotiveScroll from 'locomotive-scroll';

function loader() {
	let body = $('body');
	let rocket = $('.rocket');
	let w = 0;
	let t;
	t = setInterval(function () {
		w += 1;
		rocket.css({opacity: 1});
		rocket.css({bottom: -500 + w * 15});
		rocket.css({left: -500 + w * 20});
		if (w === 100) {
			body.addClass('loaded');
			$('.header .header__link').first().addClass('is-active');
			$('.resume__desc').addClass('show');
			clearInterval(t);
			w = 0;
		}
	}, 20);
}


function init() {
	loader();
	let modal = $('.modal');
	let trigger = $('.modal-trigger');
	let closeButton = $('.close-button');

	trigger.on('click', () => {
		modal.toggleClass('show-modal');
	});

	closeButton.on('click', () => {
		modal.toggleClass('show-modal');
	});

	$(window).on('click', (e) => {
		if (e.target === modal) {
			modal.toggleClass('show-modal');
		}
	});

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true,
		tablet: {smooth: true},
		smartphone: {smooth: true},
	});

	locoScroll.on('scroll', (position) => {
		if (position.scroll.y > 50) {
			document.querySelector('body').classList.add('scrolled');
		} else {
			document.querySelector('body').classList.remove('scrolled');
		}
	});

	locoScroll.on('scroll', ({limit, scroll}) => {
		let progress = Math.round(scroll.y / limit.y * 100);
		$('.counter span').text(progress);
		$('.counter .value-bar').css({'transform': 'rotate(' + progress * 3.6 + 'deg)'});
		if (progress > 50) {
			$('.counter').addClass('over50');
		} else {
			$('.counter').removeClass('over50');
		}
		if (progress > 95) {
			$('.counter span').html('<svg>'
				+ '<use xlink:href="./images/sprites.svg#arrow-up"></use>'
				+ '</svg>');
		}
	})

	$('.counter span').on('click', () => {
		locoScroll.scrollTo('top', {
			offset: 0,
			duration: 600,
			easing: [0.25, 0.00, 0.35, 1.00],
			disableLerp: true,
		});
	})
}

export default {
	init,
}
