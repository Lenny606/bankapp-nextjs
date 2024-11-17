'use client'
import {FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";
import {Control, FieldPath} from "react-hook-form";
import {z} from "zod";
import {authFormSchema} from "@/lib/utils";
import GlobalVariables from "@/app/app.config"

const formSchema = authFormSchema(GlobalVariables.PATH_NAME.SIGN_UP)

interface CustomInput {
    name: FieldPath<z.infer<typeof formSchema>>
    label: string;
    placeholder: string;
    control: Control<z.infer<typeof formSchema>>
}

export const CustomInput = ({name, label, placeholder, control}: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <div className={'form-item'}>
                    <FormLabel className={'form-label'}>
                        {label}
                    </FormLabel>
                    <div className={'flex flex-col w-full'}>
                        <FormControl>
                            <Input placeholder={placeholder}
                                   className={'input-class'}
                                   type={name === 'password' ? name : 'text'}
                                   {...field}
                            />
                        </FormControl>
                        <FormMessage className={'form-message mt-2'}></FormMessage>
                    </div>
                </div>
            )}
        />
    )

}
