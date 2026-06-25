[
  {
    "conname": "properties_listing_type_check",
    "pg_get_constraintdef": "CHECK ((listing_type = ANY (ARRAY['sale'::text, 'rent'::text])))"
  },
  {
    "conname": "properties_property_type_check",
    "pg_get_constraintdef": "CHECK ((property_type = ANY (ARRAY['house'::text, 'apartment'::text, 'condo'::text, 'land'::text, 'commercial'::text])))"
  },
  {
    "conname": "properties_status_check",
    "pg_get_constraintdef": "CHECK ((status = ANY (ARRAY['available'::text, 'pending'::text, 'sold'::text, 'rented'::text])))"
  },
  {
    "conname": "properties_type_check",
    "pg_get_constraintdef": "CHECK ((listing_type = ANY (ARRAY['sale'::text, 'rent'::text, 'commercial'::text, 'land'::text])))"
  }
]