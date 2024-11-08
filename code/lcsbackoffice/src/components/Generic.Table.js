import React from 'react';
import PropTypes from 'prop-types';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import i18n from 'src/i18n';

function GenericTable({ columns, data }) {
    return (
        <>
            {data.length ? (
                <CTable responsive bordered>
                    <CTableHead>
                        <CTableRow>
                            {columns.map((column, index) => (
                                <CTableHeaderCell width={(columns.length/100)+"%"} key={index} scope="col">
                                    {column.label}
                                </CTableHeaderCell>
                            ))}
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {data?.map((item, rowIndex) => (
                            <CTableRow key={rowIndex}>
                                {columns.map((column, columnIndex) => (
                                    <CTableDataCell
                                        color={column.background ? column.background(item) : ""}
                                        key={columnIndex}
                                        scope={column.scope}
                                    >
                                        {column.render ? column.render(item) : item[column.field]}
                                    </CTableDataCell>
                                ))}
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            ) : (
                <p>{i18n.t('unavailableDataMessage')}</p>
            )}
        </>
    );
}

GenericTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired,
            scope: PropTypes.string,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
};

export default GenericTable;
