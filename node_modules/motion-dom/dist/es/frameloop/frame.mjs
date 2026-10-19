import { noop } from 'motion-utils';
import { createRenderBatcher } from './batcher.mjs';
import { frameData } from './frame-data.mjs';

const { schedule: frame, cancel: cancelFrame, steps: frameSteps, } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true, frameData);

export { cancelFrame, frame, frameSteps };
//# sourceMappingURL=frame.mjs.map
