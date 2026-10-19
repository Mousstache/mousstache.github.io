const timelineCache = new Map();
/**
 * Native timelines are only attached to WAAPI animations. Offsets are
 * applied to each animation as a range, so a timeline is shared by every
 * offset.
 */
function getTimeline({ container, target, axis, }) {
    let containerCache = timelineCache.get(container);
    if (!containerCache) {
        containerCache = new Map();
        timelineCache.set(container, containerCache);
    }
    const targetKey = target ?? "self";
    let targetCache = containerCache.get(targetKey);
    if (!targetCache) {
        targetCache = {};
        containerCache.set(targetKey, targetCache);
    }
    return (targetCache[axis] || (targetCache[axis] = target
        ? new ViewTimeline({ subject: target, axis })
        : new ScrollTimeline({ source: container, axis })));
}

export { getTimeline };
//# sourceMappingURL=get-timeline.mjs.map
