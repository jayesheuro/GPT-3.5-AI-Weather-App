import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";
import { weatherCodeToString } from "@/lib/weatherCodeToString";

type Props = {
    results: Root;
    city: string;
    lat: string;
    long: string;
};
const InfoPanel = ({ city, lat, long, results }: Props) => {
    return (
        <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] text-white p-10">
            <div className="pb-5">
                <h1 className="text-4xl font-bold mb-3">{decodeURI(city)}</h1>
                <p className="text-xs text-gray-400">
                    Long/Lat: {long}, {lat}
                </p>
            </div>
            <CityPicker />
            <hr className="my-8" />

            <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
                <div>
                    <p className="text-md">
                        {new Date().toLocaleDateString("en-IN", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <p className="font-extralight text-sm">
                        Timezone:{" "}
                        {Intl.DateTimeFormat().resolvedOptions().timeZone}
                    </p>
                </div>
                <p className="text-md font-bold uppercase">
                    {new Date().toLocaleTimeString("en-IN", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    })}
                </p>
            </div>
            <hr className="mt-8 mb-2" />

            <div className="flex items-center justify-between">
                <div>
                    <Image
                        src={`https://www.weatherbit.io/static/img/icons/${
                            weatherCodeToString[
                                results.current_weather.weathercode
                            ].icon
                        }.png`}
                        alt={
                            weatherCodeToString[
                                results.current_weather.weathercode
                            ].label
                        }
                        width={75}
                        height={75}
                    />
                    <div className="flex items-center justify-between space-x-10">
                        <p className="text-5xl font-semibold">
                            {results.current_weather.temperature.toFixed(1)}°C
                        </p>
                        <p className="text-right font-extralight text-l">
                            {
                                weatherCodeToString[
                                    results.current_weather.weathercode
                                ].label
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-2 py-5">
                <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
                    <SunIcon className="h-10 w-10 text-gray-400" />
                    <div className="flex-1 flex justify-between items-center">
                        <p className="font-extralight">Sunrise</p>
                        <p className="uppercase text-xl">
                            {new Date(
                                results.daily.sunrise[0]
                            ).toLocaleTimeString("en-IN", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
                    <MoonIcon className="h-10 w-10 text-gray-400" />
                    <div className="flex-1 flex justify-between items-center">
                        <p className="font-extralight">Sunset</p>
                        <p className="uppercase text-xl">
                            {new Date(
                                results.daily.sunset[0]
                            ).toLocaleTimeString("en-IN", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;