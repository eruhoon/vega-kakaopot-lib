import { KakaoTvVideoLoader } from './app/loader/VegaKakaoTvVideoLoader.ts';
import { KakaoTvChannelLoader } from './app/loader/VegaKakoTvChannelLoader.ts';

const channel = await new KakaoTvChannelLoader().load('2669634');
if (channel?.videoId) {
  const video = await new KakaoTvVideoLoader().load(channel.videoId);
  console.log(video);
}
