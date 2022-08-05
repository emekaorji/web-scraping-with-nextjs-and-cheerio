function loudIt(
	message = '😐Barry Allen later Died',
	{
		element = 'body',
		duration = 3000,
		speed = 500,
		delay = 0,
		position = 'right',
		mouseEffects = false,

		width = 'min(500px, 80vw)',
		height = 'auto',
		background = '#003663',
		opacity = 0.6,
		color = '#FFFFFF',
		fontSize = 'min(1.5em, 6vw)',
		fontWeight = 700,
		top = '8vh',
		left = 'auto',
		right = 'auto',
		borderRadius = '0.6em',
		padding = '1em',
		zIndex = 2147483647,
	} = {}
) {
	const loudBox = document.createElement('div');
	const newRight = position === 'right' && right === 'auto' ? '1em' : right;

	loudBox.classList.add('loud-box');
	loudBox.setAttribute('aria-hidden', 'true');
	loudBox.innerHTML = message;
	loudBox.style.width = width;
	loudBox.style.height = height;
	loudBox.style.background =
		background === 'success'
			? '#0D8A0D'
			: background === 'error'
			? '#FB1717'
			: background === 'warning'
			? '#BEBE19'
			: background === 'info'
			? '#003663'
			: background;
	loudBox.style.opacity = 0;
	loudBox.style.color = color;
	loudBox.style.fontSize = fontSize;
	loudBox.style.fontWeight = fontWeight;
	loudBox.style.position = element === 'body' ? 'fixed' : 'absolute';
	loudBox.style.top = `-${top}`;
	loudBox.style.left =
		position === 'left' && left === 'auto' && right === 'auto'
			? '1em'
			: position === 'center' && left === 'auto' && right === 'auto'
			? '50%'
			: left;
	loudBox.style.right =
		position === 'right' && right === 'auto' ? newRight : right;
	loudBox.style.transform =
		position === 'center' &&
		left === 'auto' &&
		right === 'auto' &&
		`translateX(-50%)`;
	loudBox.style.padding = padding;
	loudBox.style.borderRadius = borderRadius;
	loudBox.style.transition = `all ${speed}ms cubic-bezier(0,1,.39,1.33)`;
	loudBox.style.zIndex = zIndex;
	loudBox.style.userSelect = !mouseEffects && 'none';
	loudBox.style.pointerEvents = !mouseEffects && 'none';

	const container = document.querySelector(element);
	const previousPositionValue = container.style.getPropertyValue('position');
	container.style.position = 'relative';

	const existingLoudBoxArray = document.querySelectorAll('div.loud-box');
	const existingLoudBoxIndex = existingLoudBoxArray.length - 1;
	const existingLoudBox = existingLoudBoxArray[existingLoudBoxIndex];
	if (existingLoudBox) {
		existingLoudBox.insertAdjacentElement('afterend', loudBox);
	} else {
		container.prepend(loudBox);
	}

	setTimeout(() => {
		loudBox.style.opacity = opacity;
		loudBox.style.top = top;
	}, 10 + delay);

	setTimeout(() => {
		loudBox.style.top = `-${top}`;
		loudBox.style.opacity = 0;
		setTimeout(() => {
			loudBox.parentNode.removeChild(loudBox);
			previousPositionValue
				? container.style.setProperty('position', previousPositionValue)
				: container.style.removeProperty('position');
		}, 500);
	}, duration + 10 + delay);
}

export default loudIt;
