import { Separator } from "@/components/ui/separator";

import { getArticleById, getCityById } from "@/lib/service";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { City } from "@/types/type";
import { ArticleForm } from "@/components/ui/custom/article-form/ArticleForm";
async function page({ params }: { params: City }) {
    const { id } = params;
    const result = await getArticleById(id);
    const article = result?.response;
    return (
        <section className="flex flex-col justify-center items-center flex-1 my-8 space-y-8
        ">
            <div className="flex justify-center items-center relative w-full" >
                <Link href="/dashboard/articles" className="flex items-center space-x-2 absolute left-0">

                    <ArrowLeft size={20} />
                    <span>Back to articles</span>

                </Link>




            </div>
            <Separator />
            <ArticleForm article={article} id={id} />
        </section>
    )
}

export default page