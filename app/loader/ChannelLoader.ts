type Channel = {
  id: string;
  icon: string;
  videoId: string;
};

export class ChannelLoader {
  async load(channelId: string): Promise<Channel | null> {
    const res = await this.#request(channelId);
    if (!res) {
      return null;
    }
    const { body, link } = res;
    const isLive = link.indexOf('livelink') !== -1;
    if (!isLive) {
      return null;
    }

    const pathMatched = link.match(/livelink\/(.*)\?.*/);
    if (!pathMatched) {
      return null;
    }
    const videoId = pathMatched[1];
    const iconMatched = body.match(/\<meta.*og\:image.*content=\"(.*)\"\>/);
    const icon = iconMatched ? iconMatched[1] : '';
    const channel = { id: channelId, icon, videoId };
    return channel;
  }

  async #request(channelId: string): Promise<Response | null> {
    const url = `http://web-tv.kakao.com/channel/${channelId}`;
    try {
      const res = await fetch(url);
      const body = await res.text();
      const link = res.url;
      return { body, link };
    } catch {
      return null;
    }
  }
}

type Response = {
  body: string;
  link: string;
};
