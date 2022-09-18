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