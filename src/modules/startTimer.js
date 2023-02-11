const startTimer = () => {
	const button = document.getElementById('change-theme-button');

	const body = document.querySelector('body');
	const header = document.querySelector('.header');
	const headerMenuThemeButton = document.querySelector('.header-menu-theme-button');
	const i2SkillsItemBox = document.querySelector('.i2-skills-item-box');
	const footer = document.querySelector('.footer');
	const item1 = document.querySelector('.i1');
	const item2 = document.querySelector('.i2');
	const item3 = document.querySelector('.i3');
	const item4 = document.querySelector('.i4');
	const item5 = document.querySelector('.i5');
	const item6 = document.querySelector('.i6');
	const array = [body, header, headerMenuThemeButton, i2SkillsItemBox, footer, item1, item2, item3, item4, item5, item6];

	const toggleTheme = () => {
		array.forEach((item) => {
			item.classList.toggle('dark-mode');
		});
	};

	button.addEventListener('click', () => {
		toggleTheme();
		if (body.classList.contains('dark-mode')) {
			localStorage.setItem('isDarkMode', true);
			button.textContent = 'Светлый режим';
		} else {
			button.textContent = 'Тёмный режим';
			localStorage.setItem('isDarkMode', false);
		}
		isDarkMode = localStorage.getItem('isDarkMode');
	});

	let isDarkMode = localStorage.getItem('isDarkMode');

	if (isDarkMode === 'true') {
		toggleTheme();
		button.textContent = 'Светлый режим';
	}
};

export default startTimer;
