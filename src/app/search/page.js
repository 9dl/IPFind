"use client"
import { useSearchParams } from 'next/navigation';
import {
    Link,
    Snippet,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {useEffect, useState} from "react";

export default function Home() {
    const fetchDataFromAPI = async () => {
        try {
            const searchParams = new URLSearchParams(window.location.search);
            const ip = searchParams.get("ip");

            if (ip) {
                const response = await fetch(`/api?ip=${ip}`);
                if (response.ok) {
                    const data = await response.json();
                    setIpData(data);
                } else {
                    setError(`Failed to fetch IP information`);
                }
            } else {
                setError("No IP address provided in the query parameters.");
            }
        } catch (error) {
            console.log(error)
            setError( "Something went wrong. Please try again. (Check Developer Console)");
        }
    };

    const [ipData, setIpData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDataFromAPI();
    }, []); // Fetch data when the component mounts

    const searchParams = useSearchParams();
    const search = searchParams.get("ip");

    return (
        <div className={`container dark p-4`}>
            <div>
                <h1 className="text-3xl font-bold">IP Finder</h1>
                <div className={`inline-flex gap-1 mb-3`}>
                    <p>Developed By</p>
                    <Link href={"https://obscurity.cc/"}>Obscurity.cc</Link>
                </div>

                <div className={"flex justify-center mb-3"}>
                    <Snippet
                        className={`w-full text-center justify-center`}
                        hideCopyButton={true}
                        variant={"shadow"}
                        color={"primary"}
                    >
                        {search}
                    </Snippet>

                </div>

                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className={`flex text-left`}>
                        <Table aria-label="Information about the IP">
                            <TableHeader>
                                <TableColumn>Info</TableColumn>
                                <TableColumn>Value</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {ipData &&
                                    Object.entries(ipData)
                                        .filter(([key, value]) => key !== 'readme') // Filter out 'readme' key
                                        .map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell className={`capitalize`}>{key}</TableCell>
                                                <TableCell>
                                                    {typeof value === 'boolean'
                                                        ? value ? 'Yes' : 'No'
                                                        : String(value)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
            <p className={`scale-75 text-gray-500`}>Used API: <Link href={"https://ipinfo.io/"}>ipinfo.io</Link></p>
        </div>
    );
}