import { assertEquals } from 'https://deno.land/std@0.102.0/testing/asserts.ts';

import { VideoLoader } from './VideoLoader.ts';

const loader = new VideoLoader();

Deno.test('it should return null with invalid video', async () => {
  const loaded = await loader.load('invalid_video');
  assertEquals(null, loaded);
});
