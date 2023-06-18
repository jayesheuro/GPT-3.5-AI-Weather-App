"use client";

import { useEffect, useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";

type countryOption = {
    value: {
        latitude: string;
        longitude: string;
        isoCode: string;
    };
    label: string;
} | null;

type cityOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        name: string;
        stateCode: string;
    };
    label: string;
} | null;

function CityPicker() {
    const [selectedCountry, setSelectedCountry] = useState<countryOption>(null);
    const [selectedCity, setSelectedCity] = useState<cityOption>(null);
    const [cityOptions, setCityOptions] = useState<any>([]);
    const [countryOptions, setCountryOptions] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {
        const countryOptions = Country.getAllCountries().map((country) => ({
            value: {
                latitude: country.latitude,
                longitude: country.longitude,
                isoCode: country.isoCode,
            },
            label: country.name,
        }));
        setCountryOptions(countryOptions);
    }, []);

    useEffect(() => {
        const cityOptions = selectedCountry
            ? City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(
                  (city) => ({
                      value: {
                          latitude: city.latitude,
                          longitude: city.longitude,
                          countryCode: city.countryCode,
                          name: city.name,
                          stateCode: city.stateCode,
                      },
                      label: city.name,
                  })
              )
            : [];
        setCityOptions(cityOptions);
    }, [selectedCountry]);

    const handleSelectedCountry = (option: countryOption) => {
        setSelectedCountry(option);
        setSelectedCity(null);
    };

    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option);
        router.push(
            `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
        );
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white/80">
                    <GlobeIcon className="h-5 w-5 text-white" />
                    <label htmlFor="country">Country</label>
                </div>
                <Select
                    className="text-black"
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={handleSelectedCountry}
                />
            </div>
            {selectedCountry && (
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-white/80">
                        <GlobeIcon className="h-5 w-5 text-white" />
                        <label htmlFor="country">City</label>
                    </div>
                    <Select
                        className="text-black"
                        options={cityOptions}
                        value={selectedCity}
                        onChange={handleSelectedCity}
                    />
                </div>
            )}
        </div>
    );
}

export default CityPicker;
