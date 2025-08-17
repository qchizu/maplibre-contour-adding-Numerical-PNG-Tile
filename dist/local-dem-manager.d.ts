import AsyncCache from "./cache";
import { HeightTile } from "./height-tile";
import type { ContourTile, DecodeImageFunction, DemManager, DemManagerInitizlizationParameters, DemTile, Encoding, FetchResponse, GetTileFunction, IndividualContourTileOptions } from "./types";
import { Timer } from "./performance";
/**
 * Caches, decodes, and processes raster tiles in the current thread.
 */
export declare class LocalDemManager implements DemManager {
    tileCache: AsyncCache<string, FetchResponse>;
    parsedCache: AsyncCache<string, DemTile>;
    contourCache: AsyncCache<string, ContourTile>;
    demUrlPattern: string;
    encoding: Encoding;
    maxzoom: number;
    timeoutMs: number;
    loaded: Promise<void>;
    decodeImage: DecodeImageFunction;
    getTile: GetTileFunction;
    constructor(options: DemManagerInitizlizationParameters);
    fetchTile(z: number, x: number, y: number, parentAbortController: AbortController, timer?: Timer): Promise<FetchResponse>;
    fetchAndParseTile: (z: number, x: number, y: number, abortController: AbortController, timer?: Timer) => Promise<DemTile>;
    fetchDem(z: number, x: number, y: number, options: IndividualContourTileOptions, abortController: AbortController, timer?: Timer): Promise<HeightTile>;
    fetchContourTile(z: number, x: number, y: number, options: IndividualContourTileOptions, parentAbortController: AbortController, timer?: Timer): Promise<ContourTile>;
}
