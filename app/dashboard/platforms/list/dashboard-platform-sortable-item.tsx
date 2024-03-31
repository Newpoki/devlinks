'use client'

import { useSortable } from '@dnd-kit/sortable'
import { DashboardFormValues, DashboardPlatformOption } from '../../dashboard-schemas'
import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form'
import { useMemo } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { DashboardPlatformListField } from './field/dashboard-platform-list-field'

type DashboardPlatformSortableItemProps = {
    field: FieldArrayWithId<DashboardFormValues, 'platforms', 'id'>
    index: number
    platformsOptions: DashboardPlatformOption[]
    onRemove: UseFieldArrayRemove
    isDraggingDisabled: boolean
}

export const DashboardPlatformSortableItem = ({
    field,
    index,
    platformsOptions,
    onRemove,
    isDraggingDisabled,
}: DashboardPlatformSortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: field.id,
        data: {
            platformIndex: index,
        },
    })

    const style = useMemo<React.CSSProperties>(
        () => ({
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
        }),
        [isDragging, transform, transition]
    )

    return (
        <DashboardPlatformListField
            attributes={attributes}
            listeners={listeners}
            setNodeRef={setNodeRef}
            platformsOptions={platformsOptions}
            index={index}
            onRemove={onRemove}
            style={style}
            isDragging={isDragging}
            isDraggingDisabled={isDraggingDisabled}
        />
    )
}
