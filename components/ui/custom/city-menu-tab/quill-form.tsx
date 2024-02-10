"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"



export function QuillForm({ setOpen, field }: { setOpen: (value: boolean) => void, field?: any }
) {

    const [value, setValue] = useState('');
    const [Loading, setLoading] = useState(false)
    const { toast } = useToast()


    const handleAddArticle = async () => {
        //wait for 3 seconds to simulate a request
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setOpen(false)
            toast({
                variant: "success",
                title: "Added Article",
                description: "Article has been added successfully!",

            })
        }, 3000)
    }


    return (

        <div className="w-full h-full ">
            <ReactQuill className='w-full' theme="snow" {...field} />

        </div>


    )
}