'use client'

import {
    DndContext,
    DragOverEvent,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useCallback, useEffect, useState } from 'react'
import { FieldArrayWithId, UseFieldArrayRemove, UseFieldArraySwap } from 'react-hook-form'
import { DashboardFormValues, DashboardPlatformOption } from '../../dashboard-schemas'
import { DashboardPlatformSortableItem } from './dashboard-platform-sortable-item'

type DashboardPlatformListProps = {
    fields: FieldArrayWithId<DashboardFormValues, 'platforms', 'id'>[]
    platformsOptions: DashboardPlatformOption[]
    onRemove: UseFieldArrayRemove
    swap: UseFieldArraySwap
}

export const DashboardPlatformList = ({
    fields,
    platformsOptions,
    onRemove,
    swap,
}: DashboardPlatformListProps) => {
    const [isMounted, setIsMounted] = useState(false)

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 8,
        },
    })

    const sensors = useSensors(mouseSensor, touchSensor)

    const handleDragOver = useCallback(
        ({ active, over }: DragOverEvent) => {
            if (over == null) {
                return
            }

            if (active.data.current == null || over.data.current == null) {
                return
            }

            const activeData = active.data.current

            const overData = over.data.current

            swap(activeData.platformIndex, overData.platformIndex)
        },
        [swap]
    )

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragOver={handleDragOver}
        >
            <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                <ul className="flex flex-col gap-6">
                    {fields.map((field, index) => {
                        return (
                            <li key={field.id}>
                                <DashboardPlatformSortableItem
                                    key={field.id}
                                    field={field}
                                    index={index}
                                    platformsOptions={platformsOptions}
                                    onRemove={onRemove}
                                />
                            </li>
                        )
                    })}
                </ul>
            </SortableContext>
        </DndContext>
    )
}
