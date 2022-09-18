interface OutcomeStatus {
  category: string;
  date: string;
};

export interface Crime {
  category: string;
  location_type: string;
  location: {
    latitude: number;
    longitude: number;
    street: {
      id: number;
      name: string;
    };
  };
  context: string;
  outcome_status: ?OutcomeStatus;
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
}

export interface Totals {
  [key: string]: number;
}

export interface Address {
  city: string;
  state_district: string;
  state: string;
  "ISO3166-2-lvl4": string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface GeoLocation {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
  address: Address;
  extraTags: { [key: string]: string };
}