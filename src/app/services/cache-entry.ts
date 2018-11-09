import { HttpResponse } from '@angular/common/http';

/**
 * Stores the url, response, and time for a cached request.
 * Also sets the time a cached request expires by.
 */
export interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  entryTime: number;
}

export const MAX_CACHE_AGE = 60000; // in milliseconds
