import { useRef, useEffect } from 'react';

const useDidUpdateEffect = (func, dependencies) => {
	const didUpdate = useRef(false);

	useEffect(() => {
		if (didUpdate.current) func();
		else didUpdate.current = true;
	}, [...dependencies]);
};

export default useDidUpdateEffect;
