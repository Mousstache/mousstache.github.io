import { MotionGlobalConfig } from 'motion-utils';
import { time } from '../frameloop/sync-time.mjs';
import { JSAnimation } from './JSAnimation.mjs';
import { getFinalKeyframe } from './keyframes/get-final.mjs';
import { KeyframeResolver, flushKeyframeResolvers } from './keyframes/KeyframesResolver.mjs';
import { NativeAnimationExtended } from './NativeAnimationExtended.mjs';
import { canAnimate } from './utils/can-animate.mjs';
import { makeAnimationInstant } from './utils/make-animation-instant.mjs';
import { resolveStartTime } from './utils/resolve-start-time.mjs';
import { WithPromise } from './utils/WithPromise.mjs';
import { supportsBrowserAnimation } from './waapi/supports/waapi.mjs';
import { canGroupTransform, TransformAnimation } from './waapi/transforms/TransformAnimation.mjs';

class AsyncMotionValueAnimation extends WithPromise {
    constructor(options) {
        super();
        /**
         * Bound to support return animation.stop pattern
         */
        this.stop = () => {
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = time.now();
        const { keyframes, name, motionValue, element } = options;
        /**
         * animateMotionValue builds a fresh options object per value, so
         * it's completed in place as keyframes resolve rather than copied.
         */
        const optionsWithDefaults = options;
        optionsWithDefaults.autoplay ?? (optionsWithDefaults.autoplay = true);
        optionsWithDefaults.delay ?? (optionsWithDefaults.delay = 0);
        optionsWithDefaults.type ?? (optionsWithDefaults.type = "keyframes");
        optionsWithDefaults.repeat ?? (optionsWithDefaults.repeat = 0);
        optionsWithDefaults.repeatDelay ?? (optionsWithDefaults.repeatDelay = 0);
        optionsWithDefaults.repeatType ?? (optionsWithDefaults.repeatType = "loop");
        const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
        this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
        this.keyframeResolver = undefined;
        const { name, type, velocity, delay, isHandoff, onUpdate } = options;
        this.resolvedAt = time.now();
        /**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */
        let canAnimateValue = true;
        if (!canAnimate(keyframes, name, type, velocity)) {
            canAnimateValue = false;
            if (MotionGlobalConfig.instantAnimations || !delay) {
                onUpdate?.(getFinalKeyframe(keyframes, options, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            makeAnimationInstant(options);
            options.repeat = 0;
        }
        const { onComplete } = options;
        options.finalKeyframe = finalKeyframe;
        options.keyframes = keyframes;
        /**
         * JSAnimation and NativeAnimation call onComplete exactly when
         * their own `finished` resolves, so this replaces a promise chain
         * per value with a callback.
         */
        options.onComplete = () => {
            onComplete?.();
            this.notifyFinished();
        };
        /**
         * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
         * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
         * optimised animation.
         *
         * Also skip WAAPI when keyframes aren't animatable, as the resolved
         * values may not be valid CSS and would trigger browser warnings.
         */
        const useWaapi = canAnimateValue && !isHandoff && supportsBrowserAnimation(options);
        /**
         * Independent transforms (x, scale etc) on an HTML element are
         * composed into one WAAPI transform animation per element.
         */
        const isGroupedTransform = !useWaapi && canGroupTransform(options);
        /**
         * Resolve startTime for the animation. A startTime passed in options
         * (an optimised appear handoff syncing to its WAAPI animation) takes
         * precedence.
         *
         * *Ideally*, we would use the createdAt time as t=0 as the following
         * frame would then be the first frame of the animation in progress,
         * which would feel snappier. If keyframes resolved on a later frame,
         * and long after creation, we start from then instead.
         *
         * If they resolved immediately, a JSAnimation picks its own start
         * time and resolves it the same way on its first frame, so every
         * animation started in that moment stays in sync. WAAPI has no frame
         * of ours to do that on.
         */
        if (sync &&
            (useWaapi ||
                isGroupedTransform ||
                this.resolvedAt !== this.createdAt)) {
            options.startTime ?? (options.startTime = resolveStartTime(this.createdAt, this.resolvedAt));
        }
        let animation;
        if (useWaapi) {
            /**
             * The resolver needed the VisualElement, WAAPI needs the DOM
             * element. JSAnimation reads neither, so this is safe to
             * leave in place if we fall back to it.
             */
            options.element = options.motionValue?.owner?.current;
            try {
                animation = new NativeAnimationExtended(options);
            }
            catch {
                animation = new JSAnimation(options);
            }
        }
        else if (isGroupedTransform) {
            animation = new TransformAnimation(options);
        }
        else {
            animation = new JSAnimation(options);
        }
        if (this.pendingTimeline) {
            this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        this._animation = animation;
    }
    get finished() {
        return this._animation ? this._animation.finished : super.finished;
    }
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(() => { });
    }
    /**
     * The value now, if the animation runs on the compositor.
     */
    liveValue() {
        return this._animation?.liveValue?.();
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            flushKeyframeResolvers();
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(newTime) {
        this.animation.time = newTime;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(newSpeed) {
        this.animation.speed = newSpeed;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(timeline) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(timeline);
        }
        else {
            this.pendingTimeline = timeline;
        }
        return () => this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}

export { AsyncMotionValueAnimation };
//# sourceMappingURL=AsyncMotionValueAnimation.mjs.map
