"use client"

import Link from 'next/link';
import React, { useState } from 'react';
// import Link from 'next/link';

interface SubjectCardProps {
    name: string;
    content: SubjectDict | BlogPost;
    depth: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ name, content, depth }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const headingLevel = Math.min(6, depth);
    const headingClass = `decrease h${headingLevel}`;
    const cardClass = expanded ? 'card expanded' : 'card';

    return (
        <Link href={`/${name}`}>
            <div className={`col-span-2 md:col-span-1 ${cardClass} cursor-pointer`}>
                <div className="p-4 border border-gray-300 rounded-b" onClick={toggleExpand}>
                    <text className={headingClass}>
                        {name}
                    </text>
                    {expanded && (
                        <ul>
                            {Object.entries(content).map(([itemName, itemContent]) => (
                                <li key={itemName}>
                                    {("meta" in itemContent) && ("content" in itemContent) ? (
                                        <p>{itemContent.content}</p>
                                    ) : (
                                        <SubjectCard name={itemName} content={itemContent} depth={depth + 1} />
                                    )
                                    }
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default SubjectCard;
