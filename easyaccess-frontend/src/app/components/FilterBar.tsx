"use client";

type FilterOptions = {
  country: string;
  city: string;
  village: string;
  wheelchairAccessible: boolean;
  accessibleToilet: boolean;
  wideEntrance: boolean;
  parkingAvailable: boolean;
};

type FilterBarProps = {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
};

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange({ ...filters, [name]: checked });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-end">
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={filters.country}
        onChange={handleInput}
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={filters.city}
        onChange={handleInput}
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        name="village"
        placeholder="Village"
        value={filters.village}
        onChange={handleInput}
        className="border px-2 py-1 rounded"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="wheelchairAccessible"
          checked={filters.wheelchairAccessible}
          onChange={handleCheckbox}
        />
        Wheelchair Accessible
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="accessibleToilet"
          checked={filters.accessibleToilet}
          onChange={handleCheckbox}
        />
        Accessible Toilet
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="wideEntrance"
          checked={filters.wideEntrance}
          onChange={handleCheckbox}
        />
        Wide Entrance
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="parkingAvailable"
          checked={filters.parkingAvailable}
          onChange={handleCheckbox}
        />
        Parking Available
      </label>
    </div>
  );
}