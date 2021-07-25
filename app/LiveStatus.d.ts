export type Live = {
  channel: LiveChannel;
  video: LiveVideo;
};

type LiveChannel = {
  id: string;
  name: string;
  icon: string;
};

type LiveVideo = {
  id: number;
  title: string;
  thumbnail: string;
  link: string;
  viewer: number;
};
