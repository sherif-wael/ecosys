import React from "react";

function useBoop({
    x = 0,
    y = 0,
    scale = 1,
    rotate = 0,
    time = 0.15,
    reset = true
}){
    const [isBooped, setIsBooped] = React.useState(false);
    const timeout = React.useRef();

    React.useEffect(
        () => {
            if(isBooped && reset){
                timeout.current = setTimeout(() => setIsBooped(false), time * 1000);
            }

            return () => clearTimeout(timeout.current);
        },
        [isBooped]
    );

    const trigger = React.useCallback(() => setIsBooped(true), []);

    const cancel = React.useCallback(() => setIsBooped(false), []);

    const styles = isBooped ?
                {transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`} :
                {transform: "translate(0px, 0px) scale(1) rotate(0deg)"};

    return [styles, { trigger, cancel }];
}

export function useBoopWithClick(config){
    const [styles, { trigger, cancel }] = useBoop({ reset: false, scale: 0.85, ...config });

    React.useEffect(
        () => {
            const handler = () => cancel();
            document.addEventListener("mouseup", handler);

            return () => document.removeEventListener("mouseup", handler);
        },
        []
    )

    return React.useMemo(
        () => ({
            onMouseDown: () => trigger(),
            onMouseUp: () => cancel(),
            onTouchStart: () => trigger(),
            onTouchEnd: () => cancel(),
            style: styles
        }),
        [styles]
    );
}

export default useBoop;