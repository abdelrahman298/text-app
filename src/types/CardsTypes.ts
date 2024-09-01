export interface IPropertyCardData {
  // data: string[];
  country: string;
  city: string;
  region: string;
  id: number;
  created_at: any;
  listing_number: string;
  for_what: string;
  rent_duration: string;
  is_fav: number;
  title: string;
  primary_image: string;
  purpose: string;
  address: string;
  rent_price: number;
  sale_price: number;
  currency: string;
  land_area: number;
  bath_room_no: number;
  bed_rooms_no: number;
  category?: string;
  property_type?: string;
  normal_featured?: string;
  broker_details: BrokerDetails[];
  facebook: string | "";
  twitter: string | "";
  google_plus: string | "";
  description: string | "";
}

export interface BrokerDetails {
  id: number;
  name: string;
  description: string;
  first_name: string;
  last_name: string;
  src: string;
  logo: string;
  img: string;
  phone: string;
  mobile: string;
  email: string;
  broker_type: string;
  properties_count: number;
}
export interface ICategoryCard {
  id: number;
  img: string;
  name: string;
  count: number;
}
export interface IAgentCardData {
  id: number;
  img: string;
  logo: string;
  name: string;
  role: string;
  count?: number;
  properties_count?: number;
  description?: string;
  showAllDetails?: boolean;
}

export interface ITestimonialCardData {
  id: number;
  img: string;
  name: string;
  stars: number;
  comment: string;
}

export interface ICounterData {
  icon: string;
  title: string;
  number: number;
}

//!------- News ----------

export interface INewsCardData {
  id: number;
  title: string;
  description: string;
  summary: string;
  image: string;
  news_category: NewsCategory;
  added_by: string;
  created_at: string;
  views: number;
  love: string;
  agent_info: {
    id: number;
    name: string;
    logo: string;
    img: string;
    phone: number;
    email: string;
    properties_count: number;
    broker_type: string;
    description: string;
  }[];
}

export interface NewsCategory {
  id: number;
  title: Title;
  main_title: string;
}

export interface Title {
  en: string;
  ar: string;
}

export interface ISinglePropertyDetails {
  id: number;
  for_what: string;
  rent_duration: string;
  listing_number: string;
  title: string;
  chart: any;
  facebook: string;
  twitter: string;
  keywords: any;
  google_plus: string;
  description: string;
  primary_image: string;
  sliders: any[];
  summary: any[];
  normal_featured: string;
  purpose: string;
  category: string;
  property_type: string;
  on_site: string;
  country: string;
  city: string;
  region: string;
  address: string;
  building_num: number;
  floor_num: number;
  apartment_num: number;
  unit_floor: string;
  rent_price: number;
  sale_price: number;
  currency: string;
  land_area: number;
  no_floors: number;
  room_ensuite: number;
  reception_pieces: number;
  bed_rooms_no: number;
  kitchens_no: number;
  living_room: number;
  bath_room_no: number;
  garage_no: number;
  garage_size: number;
  finishing: string;
  reception_floor_type: string;
  video_type: string;
  video: string;
  location: string;
  views: number;
  total_property_area: number;
  aminities: any[];
  comments: any[];
  similar_properties: SimilarProperty[];
  broker_details: BrokerDetail2[];
  autocad: any;
}

export interface SimilarProperty {
  id: number;
  listing_number: string;
  land_area: number;
  for_what: string;
  rent_duration: string;
  title: string;
  description: string;
  primary_image: string;
  normal_featured: string;
  purpose: string;
  category: string;
  property_type: string;
  priority: string;
  country: string;
  city: string;
  region: string;
  address: string;
  bed_rooms_no: number;
  bath_room_no: number;
  rent_price: number;
  currency: string;
  total_property_area: number;
  facebook: string;
  is_fav: string;
  broker_details: BrokerDetail[];
  sale_price?: number;
  created_at: string;
}

export interface BrokerDetail {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  country?: number;
  city?: number;
  region?: number;
  email_verified_at: any;
  code?: string;
  code_expired_date?: string;
  code_source?: string;
  code_usage: any;
  firebase_token: any;
  verified?: string;
  created_from?: string;
  status: any;
  bio: any;
  created_at?: string;
  updated_at?: string;
  company_name?: CompanyName;
  logo?: string;
}

export interface CompanyName {
  en: string;
  ar: string;
}

export interface BrokerDetail2 {
  id: number;
  name: string;
  description: string;
  first_name: string;
  last_name: string;
  src: string;
  logo: string;
  img: string;
  phone: string;
  email: string;
  broker_type: string;
  // submitted_props: SubmittedProp[];
  // offers: Offer[];
}
export interface IProjectCardData {
  id: number;
  title: string;
  description: string;
  image: string;
  region: string;
  listing_number: string;
}

export interface ICityCardData {
  id: number;
  city_id: number;
  type: string;
  image: string;
  title: string;
  properties_count: number;
  sale_properties: number;
  rent_properties: number;
}

export interface IdefaultData {
  api_url: string;
  basic_color: string;
  colored_logo: string;
  created_at: string;
  id: number;
  name_ar: string;
  name_en: string;
  updated_at: string;
  white_logo: string;
}
