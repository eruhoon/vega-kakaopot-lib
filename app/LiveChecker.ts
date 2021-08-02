import { Live } from './Live.d.ts';
import { VideoLoader } from './loader/VideoLoader.ts';
import { ChannelLoader } from './loader/ChannelLoader.ts';

export class LiveChecker {
  #channelLoader = new ChannelLoader();
  #videoLoader = new VideoLoader();

  async getLiveStatus(channelId: string): Promise<Live | null> {
    const channel = await this.#channelLoader.load(channelId);
    if (!channel) {
      return null;
    }
    const video = await this.#videoLoader.load(channel.videoId);
    if (!video) {
      return null;
    }
    return {
      channel: {
        id: channel.id,
        name: video.channelName,
        icon: channel.icon,
      },
      video: {
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        link: this.#getLink(video.id),
        viewer: video.viewer,
      },
    };
  }

  #getLink(videoId: number): string {
    return `http://web-tv.kakao.com/embed/player/livelink/${videoId}`;
  }
}
