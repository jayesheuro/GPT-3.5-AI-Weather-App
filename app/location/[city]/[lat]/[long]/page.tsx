import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { Callout, Card, Metric, Text, Color } from "@tremor/react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import React from "react";
import InfoPanel from "@/components/InfoPanel";
import TempChart from "@/components/TempChart";
import RainChart from "@/components/RainChart";
import HumidityChart from "@/components/HumidityChart";
import { cleanData } from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";

export const revalidate = 60;

type Props = {
    params: {
        city: string;
        lat: string;
        long: string;
    };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
    const client = getClient();
    const { data } = await client.query({
        query: fetchWeatherQuery,
        variables: {
            current_weather: "true",
            longitude: long,
            latitude: lat,
            timezone: "IST",
        },
    });
    const results: Root = data.myQuery;

    const dataToSend = cleanData(results, city);

    let GPTData = {
        content:
            "Something went wrong while fetching weather summary data. Try changing the city again.",
    };

    const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            weatherData: dataToSend,
        }),
    });
    GPTData = await res.json();

    const { content } = GPTData;

    const statsConst: StatProps[] = [
        {
            title: "maximum temperature",
            metric:
                `${results.daily.temperature_2m_max[0].toFixed(1)}°` || "--",
            color: "yellow",
        },
        {
            title: "minumum temperature",
            metric:
                `${results.daily.temperature_2m_min[0].toFixed(1)}°` || "--",
            color: "green",
        },
        {
            title: "UV index",
            metric: results.daily.uv_index_max[0].toFixed(1) || "--",
            color: "rose",
        },
        {
            title: "Wind speed",
            metric:
                `${results.current_weather.windspeed.toFixed(1)}m/s` || "--",
            color: "cyan",
        },
        {
            title: "wind direction",
            metric:
                `${results.current_weather.winddirection.toFixed(1)}°` || "--",
            color: "violet",
        },
    ];
    return (
        <div className="flex flex-col min-h-screen md:flex-row">
            <InfoPanel city={city} lat={lat} long={long} results={results} />
            <div className="flex-1 p-5 lg:p-10">
                <div className="p-5">
                    <div className="pb-5">
                        <h2 className="text-xl font-bold">Today's Overview</h2>
                        <p className="text-sm text-gray-400">
                            Last Updated at:{" "}
                            {new Date(
                                results.current_weather.time
                            ).toLocaleString()}{" "}
                            ({results.timezone})
                        </p>
                    </div>
                    <div className="m2 mb-5">
                        <CalloutCard message={content} />
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 my-2">
                        {statsConst.slice(0, 3).map((stat, index) => {
                            if (index === 2 && Number(stat.metric) > 5) {
                                return (
                                    <div
                                        key={stat.title + index}
                                        className="flex flex-col"
                                    >
                                        <StatCard
                                            title={stat.title}
                                            metric={stat.metric}
                                            color={stat.color}
                                        />
                                        <CalloutCard
                                            message="The UV is high today, watch out and wear SPF"
                                            warning
                                        />
                                    </div>
                                );
                            }
                            return (
                                <StatCard
                                    key={stat.title + index}
                                    title={stat.title}
                                    metric={stat.metric}
                                    color={stat.color}
                                />
                            );
                        })}
                        <div className="flex flex-col my-2 gap-5 xl:flex-row xl:space-x-3 xl:my-0 xl:gap-0">
                            {statsConst.slice(3).map((stat, index) => {
                                return (
                                    <StatCard
                                        key={stat.title + index}
                                        title={stat.title}
                                        metric={stat.metric}
                                        color={stat.color}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <hr className="mb-5" />
                <div className="p-5 space-y-3">
                    <TempChart results={results} />
                    <RainChart results={results} />
                    <HumidityChart results={results} />
                </div>
            </div>
        </div>
    );
}

// chatGPT response card
type CalloutProps = {
    message: string;
    warning?: boolean;
};
const CalloutCard = ({ message, warning }: CalloutProps) => {
    return (
        <Callout
            className="mt-4"
            title={message}
            icon={warning ? ExclamationIcon : CheckCircleIcon}
            color={warning ? "rose" : "teal"}
        />
    );
};

type StatProps = {
    title: string;
    metric: string;
    color: Color;
};
const StatCard = ({ title, metric, color }: StatProps) => {
    return (
        <Card decoration="top" decorationColor={color}>
            <Text className="capitalize">{title}</Text>
            <Metric>{metric}</Metric>
        </Card>
    );
};

export default WeatherPage;
