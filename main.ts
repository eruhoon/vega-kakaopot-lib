import { VideoLoader } from './app/loader/VideoLoader.ts';
import { ChannelLoader } from './app/loader/ChannelLoader.ts';

const channel = await new ChannelLoader().load('2669634');
if (channel?.videoId) {
  const video = await new VideoLoader().load(channel.videoId);
  console.log(video);
}
