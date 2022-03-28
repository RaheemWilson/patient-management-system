import React from 'react';
import { Badge } from '@mantine/core';

function BadgeComponent({ status }) {
    let color = status === "Pending" ? "yellow" : status === "Approved" ? "teal" : "red"
    return (
        <>
            <Badge color={color} size="lg" radius="sm">{status}</Badge>
       </>
    );
}

export default BadgeComponent;