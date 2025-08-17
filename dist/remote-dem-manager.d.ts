import Actor from "./actor";
import type WorkerDispatch from "./worker-dispatch";
import { Timer } from "./performance";
import type { ContourTile, DemManager, DemManagerInitizlizationParameters, DemTile, Encoding, FetchResponse, IndividualContourTileOptions } from "./types";
export declare class MainThreadDispatch {
    decodeImage: (blob: Blob, encoding: Encoding, abortController: AbortController) => Promise<import("./types").TransferrableDemTile>;
}
/**
 * Caches, decodes, and processes raster tiles in a shared web worker.
 */
export default class RemoteDemManager implements DemManager {
    managerId: number;
    actor: Actor<WorkerDispatch>;
    loaded: Promise<any>;
    constructor(options: DemManagerInitizlizationParameters);
    fetchTile: (z: number, x: number, y: number, abortController: AbortController, timer?: Timer) => Promise<FetchResponse>;
    fetchAndParseTile: (z: number, x: number, y: number, abortController: AbortController, timer?: Timer) => Promise<DemTile>;
    fetchContourTile: (z: number, x: number, y: number, options: IndividualContourTileOptions, abortController: AbortController, timer?: Timer) => Promise<ContourTile>;
}
