import { useEffect, RefObject } from "react";

const useClickOutside = (elmRef: RefObject<HTMLElement>, setVisibility: (value: boolean) => void, elmVisibility: boolean) => {

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            if (elmRef.current && !elmRef.current.contains(e.target)) {
                setVisibility(false);
            }
        };

        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [elmVisibility]);

}

export default useClickOutside;