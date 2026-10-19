import { easingDefinitionToFunction } from 'motion-utils';

function getOriginIndex(from, total) {
    if (from === "first") {
        return 0;
    }
    else {
        const lastIndex = total - 1;
        return from === "last" ? lastIndex : lastIndex / 2;
    }
}
function stagger(duration = 0.1, { startDelay = 0, from = 0, ease, grid } = {}) {
    /**
     * Distances from the origin for each element count. The final entry
     * holds the distance used to normalise easing.
     */
    const cache = {};
    return (i, total) => {
        let distances = cache[total];
        if (!distances) {
            const [columns, rows] = grid || [Infinity, 1];
            const lastX = Math.min(columns, total) - 1;
            const lastY = Math.max(rows, Math.ceil(total / columns)) - 1;
            const isIndex = typeof from === "number";
            const scale = from === "first" ? 0 : from === "last" ? 1 : 0.5;
            const originX = isIndex ? from % columns : lastX * scale;
            const originY = isIndex ? Math.floor(from / columns) : lastY * scale;
            distances = cache[total] = [];
            for (let j = 0; j < total; j++) {
                const x = j % columns;
                const y = Math.floor(j / columns);
                const edgeX = Math.min(x, lastX - x);
                const edgeY = Math.min(y, lastY - y);
                if (from === "random") {
                    // Inside-out shuffle, so each element gets a distinct step
                    const k = (Math.random() * (j + 1)) | 0;
                    distances[j] = distances[k];
                    distances[k] = j;
                }
                else {
                    distances[j] =
                        from === "edges"
                            ? Math.min(lastX ? edgeX : edgeY, lastY ? edgeY : edgeX)
                            : Math.hypot(x - originX, y - originY);
                }
            }
            distances.push(grid ? Math.max(...distances) : total);
        }
        let delay = duration * distances[i];
        const maxDelay = duration * distances[total];
        if (ease && maxDelay) {
            const easingFunction = easingDefinitionToFunction(ease);
            delay = easingFunction(delay / maxDelay) * maxDelay;
        }
        return startDelay + delay;
    };
}

export { getOriginIndex, stagger };
//# sourceMappingURL=stagger.mjs.map
