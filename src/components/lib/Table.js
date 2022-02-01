import React from "react";
import styled from "styled-components";
import usePagination from "hooks/usePagination";
import IconButton from "./IconButton";
import Text from "./Text";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Table({ tableHead, list, limit = 6, children, withPagination = true }){
    const { 
        sublist,
        maxPageCount,
        currentPage,
        nextPage,
        prevPage
    } = usePagination({ list, limit });

    const rows = withPagination ? sublist : list;

    return (
        <TableCard>
            <StyledTable>
                <thead>
                    <tr>
                        {
                            tableHead.map((colName, index) => (
                                <th key={index}>{colName}</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    <TransitionGroup component={null} key={currentPage}>
                        {
                            React.Children.map(children(rows), row => (
                                <CSSTransition key={row.key} classNames="fadeleft" timeout={200}>
                                    {row}
                                </CSSTransition>    
                            ))
                        }
                    </TransitionGroup>
                </tbody>
            </StyledTable>

            <TableFooter>
                <RoundButton type="leftChevron" onClick={prevPage} hidden={currentPage === 1} />
                <Text as="span" size="xs">{currentPage} / {maxPageCount}</Text>
                <RoundButton type="rightChevron" onClick={nextPage} hidden={currentPage === maxPageCount} />
            </TableFooter>
        </TableCard>
    )
}

export const TableCard = styled.div`
    background-color: #fff;
    padding: 24px;
    border-radius: 10px;
    margin: 0 0 30px;
`;

export const StyledTable = styled.table`
    width: 100%;
    text-align: ${props => props.theme.isArabic ? "right" : "left"};
    border: none;
    border-collapse: collapse;
    color: var(--primary-color);
    
    tr{
        border-bottom: 1px solid var(--primary-color);
        padding: 50px 0;
    
        &:hover:not(thead > tr){
            background-color: var(--light-gray);
        }

        &:last-child{
            border-bottom: none;
        }
    }

    td{
        padding: 16px;
        text-transform: capitalize;
        direction: ltr;
    }

    td.actions{
        ${props => props.theme.mixins.flexVertCenter};
        direction: ${props => props.theme.isArabic ? "rtl" : "ltr"};

        & > * {
            margin-inline-end: 15px;
        }

        & > *:last-child{
            margin-inline-end: 0px;
        }
    }

    th{
        font-weight: 700;
        padding: 16px;
    }
`;

const TableFooter = styled.div`
    ${props => props.theme.mixins.flexCenter};

    & > * {
        margin: 0 10px 0 0;
    }

    & > *:last-child {
        margin: 0;
    }
`;

const RoundButton = styled(IconButton)`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: var(--primary-color);
    line-height: 0;
    font-size: var(--fz-xxl);
    visibility: ${props => props.hidden ? "hidden" : "visible"};
`;

export default Table;