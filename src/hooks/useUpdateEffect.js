import { useEffect, DependencyList, EffectCallback } from 'react';

import { useIsFirstRender } from './useIsFirstRender';

export const useUpdateEffect = (effect, deps) => {
    const isFirst = useIsFirstRender();

    useEffect(() => {
        if (!isFirst) {
            return effect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};