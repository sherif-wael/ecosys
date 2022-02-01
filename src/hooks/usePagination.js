import React from "react";

function usePagination({
    list,
    limit,
    initialPage = 1
}){
    const [page, setPage] = React.useState(initialPage);

    React.useEffect(
        () => {
            setPage(Math.min(page, maxPageCount));
        },
        [list.length]
    )

    const maxPageCount = React.useMemo(() => Math.max(Math.ceil(list.length / limit), 1), [limit, list.length]);

    const prevPage = React.useCallback(
        () => setPage(Math.max(page - 1, 1)), [page]
    );

    const nextPage = React.useCallback(
        () => setPage(Math.min(page + 1, maxPageCount)), [page]
    );

    const skip = (page - 1) * limit;

    const sublist = list.slice(skip, skip + limit);

    return {
        prevPage,
        nextPage,
        maxPageCount,
        currentPage: page,
        list,
        sublist
    }
}

export default usePagination;