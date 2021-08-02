export class VideoLoader {
  async load(videoId: string): Promise<Video | null> {
    const body = await this.#request(videoId);
    if (!body || !body.liveLink) {
      console.error('KakaoTvVideoLoader: structure error');
      return null;
    }

    const channel = body.liveLink.channel;
    const live = body.liveLink.live;

    const isOnAir = live.status === 'ONAIR';
    if (!isOnAir) {
      return null;
    }

    const video: Video = {
      id: live.id,
      nickname: channel.name,
      channelName: channel.name,
      title: live.title,
      url: `http://web-tv.kakao.com/embed/player/livelink/${videoId}`,
      thumbnail: live.thumbnailUri,
      viewer: parseInt(live.ccuCount),
    };
    return video;
  }

  async #request(videoId: string): Promise<RawKakaoTvVideo | null> {
    const host = `http://web-tv.kakao.com/api/v1/app`;
    const dir = `livelinks/${videoId}/impress`;
    const query = new URLSearchParams({
      fulllevels: 'liveLink',
      player: 'monet_flash',
      section: 'home',
      dteType: 'PC',
      service: 'kakao_tv',
      fields: 'ccuCount,thumbnailUri',
    });
    const url = `${host}/${dir}?${query}`;
    try {
      const res = await fetch(url);
      const json: unknown = await res.json();
      return this.#parseData(json);
    } catch (e) {
      console.error('request: error: ' + e);
      return null;
    }
  }

  #parseData(json: unknown): RawKakaoTvVideo {
    const raw = json as RawKakaoTvVideo;
    return raw;
  }
}

type Video = {
  id: number;
  nickname: string;
  channelName: string;
  title: string;
  url: string;
  thumbnail: string;
  viewer: number;
};

type RawKakaoTvVideo = {
  liveLink: {
    channelId: number;
    liveId: number;
    displayTitle: string;
    channel: {
      id: number;
      userId: number;
      name: string;
      description: string;
    };
    live: {
      id: number;
      userId: number;
      channelId: number;
      title: string;
      description: string;
      status: string;
      ccuCount: string;
      thumbnailUri: string;
    };
  };
};
