import { DataTable } from "@/components/ui/custom/data-table";
import { City } from "@/types/type"; // Assuming the interface is defined in a City.ts file
import { getAllArticles, getCities } from "@/lib/service";
import { Button } from "@/components/ui/button";
interface CitiesProps {
    cities: City[];
}
import { columns } from "./columns";

const ArticlePage = async () => {
    const articles = await getAllArticles()
    console.log("articles", articles)


    return (
        <div>
            <h3 className="text-2xl text-medium pt-4">Articles</h3>
            <DataTable data={articles?.response} columns={columns} searchTag="name" />
        </div>
    );
};

export default ArticlePage;
