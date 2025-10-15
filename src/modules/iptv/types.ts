export type XtreamUserInfo = {
  username: string;
  password: string;
  status: 'Active' | 'Banned' | 'Disabled';
  exp_date?: string;
  message?: string;
};

export type XtreamServerInfo = {
  url: string;
  port?: string;
  https_port?: string;
  serverProtocol?: string;
  timezone?: string;
};

export type XtreamLoginResponse = {
  user_info: XtreamUserInfo;
  server_info: XtreamServerInfo;
};

export type XtreamCategory = {
  category_id: string;
  category_name: string;
  parent_id: number;
};

export type XtreamVod = {
  stream_id: number;
  name: string;
  stream_icon?: string;
  added?: string;
  rating?: string;
  category_id?: string;
  plot?: string;
  container_extension?: string;
};

export type XtreamSeries = {
  series_id: number;
  name: string;
  cover?: string;
  rating?: string;
  plot?: string;
  category_id?: string;
  last_modified?: string;
};

export type XtreamEpisode = {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info?: {
    duration?: string;
    plot?: string;
    rating?: string;
  };
};

export type XtreamSeriesInfo = {
  info: {
    name: string;
    cover?: string;
    plot?: string;
    rating?: string;
    genre?: string;
    cast?: string;
    director?: string;
    releaseDate?: string;
  };
  episodes: {
    [season: string]: XtreamEpisode[];
  };
};

export type Credentials = {
  baseUrl: string;
  username: string;
  password: string;
};

export type MediaType = 'movie' | 'series';
