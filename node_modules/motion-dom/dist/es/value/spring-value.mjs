import { motionValue } from './index.mjs';
import { spring } from '../animation/generators/spring.mjs';
import { follow } from './utils/follow.mjs';
import { isMotionValue } from './utils/is-motion-value.mjs';

/**
 * Create a `MotionValue` that animates to its latest value using a spring.
 * Can either be a value or track another `MotionValue`.
 *
 * ```jsx
 * const x = motionValue(0)
 * const y = springValue(x, { stiffness: 300 })
 * ```
 *
 * @param source - Initial value or MotionValue to track
 * @param options - Spring configuration options
 * @returns `MotionValue`
 *
 * @public
 */
function springValue(source, options) {
    const value = motionValue(isMotionValue(source) ? source.get() : source);
    attachSpring(value, source, options);
    return value;
}
/**
 * Attach a spring animation to a MotionValue that will animate whenever the value changes.
 *
 * @param value - The MotionValue to animate
 * @param source - Initial value or MotionValue to track
 * @param options - Spring configuration options
 * @returns Cleanup function
 *
 * @public
 */
function attachSpring(value, source, options) {
    return follow(value, source, { ...options, type: spring });
}

export { attachSpring, springValue };
//# sourceMappingURL=spring-value.mjs.map
