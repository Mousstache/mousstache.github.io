"use client";
import { attachSpring } from 'motion-dom';
import { useFollow } from './use-follow-value.mjs';

function useSpring(source, options = {}) {
    return useFollow(source, options, attachSpring);
}

export { useSpring };
//# sourceMappingURL=use-spring.mjs.map
