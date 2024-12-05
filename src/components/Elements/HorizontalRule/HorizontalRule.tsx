import React from 'react'

const weights = {
    solid: "border-1",
    semiBold: "border-2",
    bold: "border-3",
};

type HorizontalRuleProps = React.HTMLAttributes<HTMLHRElement> & {
    weight?: keyof typeof weights;
    className?: string;
}

export const HorizontalRule: React.FC<HorizontalRuleProps> = ({
    weight = "solid",
    className = "",
    ...props
}) => {
    return (
        <>
            <hr className={`${weights[weight]} ${className} border-slate-200 dark:border-emerald-200`} />
        </>
    );
}