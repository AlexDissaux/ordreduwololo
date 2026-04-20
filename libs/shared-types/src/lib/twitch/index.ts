export interface ITwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  is_mature: boolean;
}

export interface ITwitchVod {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  created_at: string;
  url: string;
  thumbnail_url: string;
  view_count: number;
  duration: string;
}
