'use client'

import { FieldPath, FieldValues, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input, InputProps } from '../ui/input'

interface ControlledInputProps<TFieldValues extends FieldValues> extends InputProps {
    label: string
    name: FieldPath<TFieldValues>
}

export function ControlledInput<TFieldValues extends FieldValues>({
    className,
    name,
    label,
    placeholder,
}: ControlledInputProps<TFieldValues>) {
    const { control } = useFormContext<TFieldValues>()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                return (
                    <FormItem className="w-full md:grid md:grid-cols-[256px_auto] md:items-center">
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Input
                                {...field}
                                value={field.value ?? ''}
                                className={className}
                                placeholder={placeholder}
                                error={fieldState.error?.message}
                            />
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}
