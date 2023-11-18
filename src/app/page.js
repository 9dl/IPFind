'use client'
import {Button, Input, Link, Tooltip} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

export default function Home() {
    const [value, setValue] = useState("");

    return (
        <div className={`container dark p-4`}>
            <div>
                <h1 className="text-3xl font-bold">IP Finder</h1>
                <div className={`inline-flex gap-1 mb-3`}>
                    <p>Developed By</p>
                    <Link href={"https://obscurity.cc/"}>Obscurity.cc</Link>
                </div>

                <div className="flex gap-2">
                    <Input
                        type="text"
                        label="Enter IP Address"
                        value={value}
                        onValueChange={setValue}
                        description="We prioritize your privacy and will not share the entered IP with anyone else."
                        className="max-w-xs"
                    />

                    <Tooltip showArrow={true} color={"primary"} content="Search the IP">
                        <Button as={Link} href={`/search?ip=${value}`} className={`h-14 w-14`} isIconOnly color="warning" variant="faded" aria-label="Search the IP">
                            <Icon icon="solar:eye-bold-duotone" height={32} />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
