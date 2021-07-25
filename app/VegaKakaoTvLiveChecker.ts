import { Live } from './LiveStatus.d.ts';
import { KakaoTvVideoLoader } from './loader/VegaKakaoTvVideoLoader.ts';
import { KakaoTvChannelLoader } from './loader/VegaKakoTvChannelLoader.ts';

export class VegaKakaoTvLiveChecker {
  #channelLoader = new KakaoTvChannelLoader();
  #videoLoader = new KakaoTvVideoLoader();

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
