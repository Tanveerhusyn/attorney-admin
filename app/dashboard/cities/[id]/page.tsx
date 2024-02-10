import { Separator } from "@/components/ui/separator";
import { CityMenuTabs } from "@/components/ui/custom/city-menu-tab/city-menu-tab";
import { getCityById } from "@/lib/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { City } from "@/types/type";
async function page({ params }: { params: City }) {
    const { id } = params;
    const city = await getCityById(id);
    console.log(city)
    return (
        <section className="flex flex-col justify-center items-center flex-1 my-8 space-y-8
        ">
            <div className="flex justify-center items-center relative w-full" >
                <Link href="/dashboard/cities" className="flex items-center space-x-2 absolute left-0">

                    <ArrowLeft size={20} />
                    <span>Back to cities</span>

                </Link>




            </div>
            <Separator />
            <CityMenuTabs city={city} id={id} />
        </section>
    )
}

export default page