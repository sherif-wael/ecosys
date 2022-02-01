import React from "react";

function useClickAwayListener(callback){
    let ref = React.useRef(null);

    React.useEffect(
        () => {
            const handler = e => {
                if(!ref.current || ref.current.contains(e.target)) return;
                callback(e);
            }

            document.addEventListener("mousedown", handler);
            document.addEventListener("touchstart", handler);

            return () => {
                document.removeEventListener("mousedown", handler);
                document.removeEventListener("touchstart", handler);
            }
        },
        [ref, callback]
    )

    return ref;
}

export default useClickAwayListener;