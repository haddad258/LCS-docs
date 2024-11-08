import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const MyTable = ({ data }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <Table dataSource={data} columns={columns} />
    );
};

MyTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MyTable;
