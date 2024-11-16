'use client'
import {FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";
import {Control, FieldPath} from "react-hook-form";
import {z} from "zod";
import {authFormSchema} from "@/lib/utils";

interface CustomInput {
    type: FieldPath<z.infer<typeof authFormSchema>>
    label: string;
    placeholder: string;
    control: Control<z.infer<typeof authFormSchema>>
}

export const CustomInput = ({type, label, placeholder, control} : CustomInput) => {
    return (
        <FormField
            control={control}
            name={type}
            render={({field}) => (
                <div className={'form-item'}>
                    <FormLabel className={'form-label'}>
                        {label}
                    </FormLabel>
                    <div className={'flex w-full'}>
                        <FormControl>
                            <Input placeholder={placeholder}
                                   className={'input-class'}
                                   {...field}
                            />
                        </FormControl>
                        <FormMessage className={'form-message'}></FormMessage>
                    </div>
                </div>
            )}
        />
    )

}
