import helpers from '../helpers';

function openMenu() {
	return new Promise(() => {
		helpers.lockScroll(true, helpers.$header.find('.header__menu'), 'header');
		helpers.$header.addClass('menu-open');
	});
}

function closeMenu() {
	return new Promise(() => {
		helpers.lockScroll(false, helpers.$header.find('.header__menu'), 'header');
		helpers.$header.removeClass('menu-open');
	});
}

function toggleMenu(event) {
	event.preventDefault();
	event.stopPropagation();

	if ($(event.currentTarget).hasClass('is-active')) {
		$(event.currentTarget).removeClass('is-active');
		closeMenu();
	} else {
		$(event.currentTarget).addClass('is-active');
		openMenu();
	}
}

function toggleClassMenu() {
	$('.header__link').click(function () {
		$('.header__link').removeClass('is-active');
		$(this).addClass('is-active');
	})
}

function init() {
	toggleClassMenu();

	helpers.$header = $('.header');

	$('.js-burger').on('click', toggleMenu);

	$('.header__link').on('click', () => {
		closeMenu();
		$('.js-burger').removeClass('is-active');
	});

	helpers.$document.on('keyup.header', (e) => {
		if (e.key === 'Escape' || e.key === 'Esc') {
			closeMenu();
			$('.js-burger').removeClass('is-active');
		}
	});
}

function destroy() {
	$('.js-burger').off('.header');
	helpers.$document.off('.header');
}

export default {
	init,
	destroy,
};
