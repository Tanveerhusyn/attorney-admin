import { DataTable } from "@/components/ui/custom/data-table";
import { City } from "@/types/type"; // Assuming the interface is defined in a City.ts file
import { getCities } from "@/lib/service";
import { Button } from "@/components/ui/button";
interface CitiesProps {
    cities: City[];
}
import { columns } from "./columns";

const Cities = async () => {
    const cities = await getCities()
    console.log(cities)


    return (
        <div>
            <DataTable data={cities?.results} columns={columns} searchTag="city" />
        </div>
    );
};

export default Cities;
