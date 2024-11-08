import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Space} from 'antd';

const { Search } = Input;

const DataTable = ({ columns, dataSource }) => {
  const [filteredData, setFilteredData] = useState(dataSource);

  
  const handleSearch = (text) => {
    const filteredDataSource = dataSource.filter((item) =>
      Object.values(item.user).some((value) =>
        String(value).toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filteredDataSource);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Rechercher"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
      </Space>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{
          pageSize: 5, // Nombre d'éléments par page
          hideOnSinglePage: true, // Masquer la pagination si une seule page
        }}
      />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;